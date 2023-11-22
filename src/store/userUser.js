import axios from "axios";
import { create } from "zustand";

const NEXT_PUBLIC_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const useUser = create((set) => ({
  user: {},
  createAccount: ({ username, password }) =>
    set(() => ({ user: createAccount({ username, password }) })),
}));

const createAccount = async ({ username, password }) => {
  console.log(username, password);
  return;
  const { data, status } = await axios.post(
    `${NEXT_PUBLIC_API_BASE_URL}/user`,
    { username, password, last_name: "N/A", first_name: "N/A" },
    {
      headers: { "content-type": "application/json" },
    }
  );

  console.log(data, status);

  return { data, status };
};

export default useUser;
