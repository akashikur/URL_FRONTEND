import axios from "axios";

export async function login({ email, password }) {
  let data = null;
  let error = null;
  await axios
    .post(`${import.meta.env.VITE_APP_URL}/user/login`, {
      email,
      password,
    })
    .then((res) => {
      data = res.data;
    })
    .catch((err) => {
      error = err.message;
      throw new Error(error.message);
    });
  return data;
}

export async function signup(_, formData) {
  let data = null;
  let error = null;
  await axios
    .post(`${import.meta.env.VITE_APP_URL}/user/sighUp`, formData)
    .then((res) => {
      data = res.data;
    })
    .catch((err) => {
      error = err.message;
      throw new Error(error.message);
    });
  return data;
}

export async function getCurrentUser() {
  let data = null;
  let error = null;
  await axios
    .get(`${import.meta.env.VITE_APP_URL}/user/userData`, {
      headers: { url: localStorage.getItem("token") },
    })
    .then((res) => {
      data = res.data;
    })
    .catch((err) => {
      error = err.message;
      throw new Error(error.message);
    });

  return data;
}

export async function logOut() {
  localStorage.removeItem("token");
  return;
}
