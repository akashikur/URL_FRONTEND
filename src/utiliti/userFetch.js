import axios from "axios";

export async function login({ email, password }) {
  let data = null;
  let error = null;
  await axios
    .post(`http://localhost:3000/user/login`, {
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
    .post(`http://localhost:3000/user/sighUp`, formData)
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
    .get(`http://localhost:3000/user/userData`, {
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
