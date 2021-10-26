import axios from "axios";
import { config } from "../../config";

export const getAllPages = async () => {
  return axios
    .get(config.api_url + "/wp/v2/pages")
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getAllSidebarPages = async () => {
  return axios
    .get(config.api_url + "/wp/v2/menus/main")
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
    .get(config.api_url + "/wp/v2/posts/" + id)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getAllTags = async () => {
  return axios
    .get(config.api_url + "/wp/v2/tags")
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getAllDomainesActions = async () => {
  return axios
    .get(config.api_url + "/wp/v2/domaine-action")
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getAllDomainesImpacts = async () => {
  return axios
    .get(config.api_url + "/wp/v2/domaine-impact")
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};
