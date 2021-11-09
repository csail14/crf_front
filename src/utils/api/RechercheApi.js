import axios from "axios";
import { config } from "../../config";

export const getResult = async (query) => {
  return axios
    .get(config.api_url + "/wp/v2/custom/search?" + query)
    .then((response) => {
      return response.data.filter(
        (item) =>
          item.type === "post" ||
          item.type === "documents" ||
          item.type === "indicateurs"
      );
    })
    .catch((err) => {
      return err;
    });
};
