import axios from "axios";
import { create } from "zustand";
import { get as getTasks } from "./useTask";

const ERRORS_MESSAGES_FORMAT = {
  "This_field_is_required.": "Fill up this field",
  "This_field_may_not_be_blank.": "Fill up this field",
  "user_with_this_username_already_exists.": "This UserName already exist",
  confirm_password_is_not_the_same: "Both passwords must be the same",
};

const ERRORS_MESSAGES = {
  422: {
    confirm_password: (message) =>
      ERRORS_MESSAGES_FORMAT[message.replaceAll(" ", "_")],
    password: (message) => ERRORS_MESSAGES_FORMAT[message.replaceAll(" ", "_")],
    username: (message) => ERRORS_MESSAGES_FORMAT[message.replaceAll(" ", "_")],
  },
  500: "Server Error",
};

const NEXT_PUBLIC_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const useUser = create((_) => ({
  errors: null,
  user: null,
  createAccount,
  login,
  find
}));

async function createAccount({ username, password, confirm_password }) {
  let errors = null;
  let response = null;

  response = await axios
    .post(
      `${NEXT_PUBLIC_API_BASE_URL}/user`,
      { username, password, confirm_password },
      {
        headers: { "content-type": "application/json" },
      }
    )
    .catch((error) => {
      const status = error.response.status;

      if (error.response.status === 422) {
        errors = {
          ...(error.response.data.username !== undefined && {
            username: ERRORS_MESSAGES[status]["username"](
              error.response.data.username[0]
            ),
          }),
          ...(error.response.data.password !== undefined && {
            password: ERRORS_MESSAGES[status]["password"](
              error.response.data.password[0]
            ),
          }),
          ...(error.response.data.confirm_password !== undefined && {
            confirm_password: ERRORS_MESSAGES[status]["confirm_password"](
              error.response.data.confirm_password[0]
            ),
          }),
        };
      }
    });

  if (response?.data !== undefined) {
    localStorage.setItem(
      process.env.NEXT_PUBLIC_SESSION_STORAGE,
      JSON.stringify(response.data)
    );
  }

  useUser.setState({ user: response?.data, errors });
}

async function login({ username, password }) {
  let errors = null;
  let response = null;

  response = await axios
    .post(
      `${NEXT_PUBLIC_API_BASE_URL}/user/login`,
      { username, password },
      {
        headers: { "content-type": "application/json" },
      }
    )
    .catch(() => {
      errors = {
        message: "Invalid credentials",
      };
    });

  if (response?.data !== undefined) {
    localStorage.setItem(
      process.env.NEXT_PUBLIC_SESSION_STORAGE,
      JSON.stringify(response.data)
    );
    await getTasks(response.data.access)
  }

  useUser.setState({ user: response?.data, errors });
}

async function find({ user_id, access }) {
  let errors = null;
  let response = null;

  response = await axios
    .get(`${NEXT_PUBLIC_API_BASE_URL}/user/${user_id}`, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${access}`,
      },
    })
    .catch(() => {
      errors = {
        message: "Invalid",
      };
    });

  useUser.setState({ user: { ...response?.data, access }, errors });
  
  await getTasks(access)

  return errors;
}

export { useUser, login, find, createAccount };
