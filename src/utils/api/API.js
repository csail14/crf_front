import axios from "axios";
import { config } from "../../config";

export const getAllPages = async () => {
  return axios
    .get(config.api_url + "/wp/v2/pages", {})
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};
