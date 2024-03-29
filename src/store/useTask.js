import axios from "axios";
import { create } from "zustand";

const ERRORS_MESSAGES_FORMAT = {
  "This_field_is_required.": "Fill up this field",
  "This_field_may_not_be_blank.": "Fill up this field",
  "Ensure_this_field_has_no_more_than_255_characters.":
    "No more 255 characters",
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
  destroy,
  finishStep,
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
  if (errors === null) tasks.push(response?.data);
  useTask.setState({ tasks, errors });
}

async function get(access, search = null) {
  let errors = null;
  let response = null;
  let baseUrl = `${NEXT_PUBLIC_API_BASE_URL}/task`;
  if (search !== null) {
    baseUrl = `${NEXT_PUBLIC_API_BASE_URL}/task?search=${search}`;
  }

  response = await axios
    .get(baseUrl, {
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

async function finishStep(task_id, step_id, body, access, tasks) {
  let errors = null;
  let response = null;

  response = await axios
    .put(`${NEXT_PUBLIC_API_BASE_URL}/task/${task_id}/step/${step_id}`, body, {
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

  if (errors === null) {
    tasks
      .find((task) => task.id === task_id)
      .steps.find((step) => step.id === step_id).status = "COMPLETED";
  }
  useTask.setState({ tasks, errors });
}

export { useTask, get, store, finishStep, destroy };
