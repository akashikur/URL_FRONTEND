import axios from "axios";

export async function getAllUrls() {
  let data = null;
  let error = null;
  await axios
    .get(`${import.meta.env.VITE_APP_URL}/url/allUrl`, {
      headers: { url: localStorage.getItem("token") },
    })
    .then((res) => {
      data = res.data.data;
    })
    .catch((err) => {
      error = err.message;
      throw new Error(error.message);
    });

  return data;
}

export async function deleteUrl(_, url_id) {
  let data = null;
  let error = null;
  await axios
    .delete(`${import.meta.env.VITE_APP_URL}/url/deleteUrl/${url_id}`, {
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

export async function createUrls(_, formData) {
  let data = null;
  let error = null;
  await axios
    .post(`${import.meta.env.VITE_APP_URL}/url/createUrl`, formData, {
      headers: { url: localStorage.getItem("token") },
    })
    .then((res) => {
      data = res.data.data;
    })
    .catch((err) => {
      error = err.message;
      throw new Error(error.message);
    });

  return data;
}

export async function getLongUrl(_, url_id) {
  let data = null;
  let error = null;
  await axios
    .get(`${import.meta.env.VITE_APP_URL}/url/longUrl/${url_id}`, {
      headers: { url: localStorage.getItem("token") },
    })
    .then((res) => {
      data = res.data.data;
    })
    .catch((err) => {
      error = err.message;
      throw new Error(error.message);
    });

  return data;
}

export async function getUrl(_, url_id) {
  let data = null;
  let error = null;
  await axios
    .get(`${import.meta.env.VITE_APP_URL}/url/getUrl/${url_id}`, {
      headers: { url: localStorage.getItem("token") },
    })
    .then((res) => {
      data = res.data.data[0];
    })
    .catch((err) => {
      error = err.message;
      throw new Error(error.message);
    });

  return data;
}
