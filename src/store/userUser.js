import axios from "axios";
import { create } from "zustand";

const ERRORS_MESSAGES_FORMAT = {
  "This field is required.": "Fill up this field",
  "This_field_may_not_be_blank.": "Fill up this field",
  "user_with_this_username_already_exists.": "This UserName already exist",
  "confirm_password_is_not_the_same": "Both passwords must be the same",
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

const useUser = create((set) => ({
  errors: null,
  user: null,
  createAccount: async ({ username, password, confirm_password }) => {
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
        const status = error.response.status

        if (error.response.status === 422) {
          console.log("entra a format errors")
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

    set({ user: response?.data, errors });
  },
}));

export default useUser;
/*
{
  "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTcwMTEzMDM2NywiaWF0IjoxNzAxMDQzOTY3LCJqdGkiOiI3ZjQzMGIzOGI2NWI0Y2JjOWNhMDA0NDlkYWQ2NTUwMyIsInVzZXJfaWQiOiJiMTQzYzExYy0xNjk0LTQwMjMtOThiYi04OGRiODZjZDQyNjkifQ.wYz68zJ76BqQiXSJm1EQrN3Wwn6MPskZuQwNXl4z0h8",
  "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAxMDQ3NTY3LCJpYXQiOjE3MDEwNDM5NjcsImp0aSI6IjY0NzMzYzY1ODIwYzQ4MzVhNmU4NjhhZWRmM2FlNzExIiwidXNlcl9pZCI6ImIxNDNjMTFjLTE2OTQtNDAyMy05OGJiLTg4ZGI4NmNkNDI2OSJ9.K9Zqh9d_X5f7FRvdFFGh1gmU32mFcEGpVHcUVJtPtyA",
  "user": {
      "id": "b143c11c-1694-4023-98bb-88db86cd4269",
      "username": "test21",
      "password": "pbkdf2_sha256$600000$jCKPoYb5ovkRWB8yqrmmTq$KPa5Zcrzz+lzx9HkEh931Nj+XSC2FEkJ0tFL//Ndq2s=",
      "created_at": "2023-11-27T00:12:47.294797Z",
      "updated_at": "2023-11-27T00:12:47.294821Z",
      "is_deleted": false
  }
}
*/
