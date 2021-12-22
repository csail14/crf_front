import axios from "axios";
import { config } from "../../config";

export const getResult = async (query, page) => {
  return axios
    .get(
      config.api_url +
        "/wp/v2/custom/search?" +
        query +
        "&per_page=50&page=" +
        page
    )
    .then((response) => {
      return response.data.filter(
        (item) =>
          item.type === "articles" ||
          item.type === "documents" ||
          item.type === "indicateurs"
      );
    })
    .catch((err) => {
      return err;
    });
};
