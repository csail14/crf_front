import axios from "axios";
import { config } from "../../config";

export const getAllPages = async () => {
  return axios
    .get(config.api_url + "/wp/v2/pages?per_page=100")
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getRessourceById = async (id, type) => {
  return axios
    .get(config.api_url + "/wp/v2/" + type + "/" + id)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getRessourceBySlug = async (slug, type) => {
  return axios
    .get(config.api_url + "/wp/v2/" + type + "?slug=" + slug)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getDocumentById = async (id) => {
  return axios
    .get(config.api_url + "/wp/v2/documents/" + id)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getArticleById = async (id) => {
  return axios
    .get(config.api_url + "/wp/v2/articles/" + id)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getCommentaireByPost = async (id) => {
  return axios
    .get(config.api_url + "/wp/v2/comments?post=" + id)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getAllRessources = async () => {
  return axios
    .get(config.api_url + "/wp/v2/search")
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};
