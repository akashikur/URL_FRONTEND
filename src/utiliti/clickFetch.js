import axios from "axios";
import { UAParser } from "ua-parser-js";

const parser = new UAParser();

export async function storeClicks(_, { id, originalUrl }) {
  try {
    const res = parser.getResult();
    const device = res.type || "desktop";
    const response = await fetch("https://ipapi.co/json");
    const { city, country_name: country } = await response.json();

    const clickObj = {
      url_id: id,
      city: city,
      country: country,
      device: device,
    };

    await axios
      .post(`${import.meta.env.VITE_APP_URL}/clicks/storeClicks/`, clickObj, {
        headers: { url: localStorage.getItem("token") },
      })
      .then(() => {
        window.location.href = originalUrl;
      })
      .catch((error) => {
        console.error("Error recording click:", error);
      });
  } catch (error) {
    console.error("Error recording click:", error);
  }
}
export async function getAllClicksForUrls() {
  let data = null;
  let error = null;
  try {
    await axios
      .get(`${import.meta.env.VITE_APP_URL}/clicks/getAllClicks`, {
        headers: { url: localStorage.getItem("token") },
      })
      .then((res) => {
        data = res.data.data;
      })
      .catch((error) => {
        console.error("Error recording click:", error);
      });
  } catch (err) {
    error = err.message;
    throw new Error(error.message);
  }
  return data;
}

export async function getClicksForUrl(_, url_id) {
  let data = null;
  let error = null;
  try {
    await axios
      .get(`${import.meta.env.VITE_APP_URL}/clicks/getUrlClicks/${url_id}`, {
        headers: { url: localStorage.getItem("token") },
      })
      .then((res) => {
        data = res.data.data;
      })
      .catch((error) => {
        console.error("Error recording click:", error);
      });
  } catch (err) {
    error = err.message;
    throw new Error(error.message);
  }
  return data;
}
