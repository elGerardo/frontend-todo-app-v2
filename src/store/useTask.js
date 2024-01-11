import axios from "axios";
import { create } from "zustand";

const ERRORS_MESSAGES_FORMAT = {
  "This_field_is_required.": "Fill up this field",
  "This_field_may_not_be_blank.": "Fill up this field",
};

const ERRORS_MESSAGES = {
  422: {
    title: (message) => ERRORS_MESSAGES_FORMAT[message.replaceAll(" ", "_")],
    description: (message) =>
      ERRORS_MESSAGES_FORMAT[message.replaceAll(" ", "_")],
  },
  500: "Server Error",
};

const NEXT_PUBLIC_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const useTask = create((_) => ({
  errors: null,
  tasks: [],
  store,
  get,
  find,
  destroy,
}));

async function store(body, tasks, access) {
  let errors = null;
  let response = null;

  response = await axios
    .post(`${NEXT_PUBLIC_API_BASE_URL}/task`, body, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${access}`,
      },
    })
    .catch((error) => {
      const status = error.response.status;

      errors = {
        ...(error.response.data.title !== undefined && {
          title: ERRORS_MESSAGES[status]["title"](error.response.data.title[0]),
        }),
        ...(error.response.data.description !== undefined && {
          description: ERRORS_MESSAGES[status]["description"](
            error.response.data.description[0]
          ),
        }),
      };
    });
    if(errors === null) tasks.push(response?.data)
    useTask.setState({ tasks, errors });
}

async function get(access) {
  let errors = null;
  let response = null;

  response = await axios
    .get(`${NEXT_PUBLIC_API_BASE_URL}/task`, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${access}`,
      },
    })
    .catch((_) => {
      errors = {
        message: "Invalid",
      };
    });

  useTask.setState({ tasks: response?.data, errors });
}

async function find(task_id) {}

async function destroy(task_id, tasks, access) {
  let errors = null;
  
  await axios
    .delete(`${NEXT_PUBLIC_API_BASE_URL}/task/${task_id}`, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${access}`,
      },
    })
    .catch((_) => {
      errors = {
        message: "Invalid",
      };
    });

  useTask.setState({
    tasks: tasks.filter(({ id }) => id !== task_id),
    errors,
  });
}

export { useTask, get, store, find, destroy };
