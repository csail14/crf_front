import axios from "axios";
import { config } from "../../config";

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

export const getMediaById = async (id) => {
  return axios
    .get(config.api_url + "/wp/v2/media/" + id)
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

export const getAllCategories = async () => {
  return axios
    .get(config.api_url + "/wp/v2/categories")
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getAllOptions = async () => {
  return axios
    .get(config.api_url + "/acf/v3/options/options")
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getFooterMenu = async () => {
  return axios
    .get(config.api_url + "/wp/v2/menus/footer")
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};
