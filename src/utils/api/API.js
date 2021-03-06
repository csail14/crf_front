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
    .get(config.api_url + "/wp/v2/post_tag?per_page=100")
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getAllDomainesActions = async () => {
  return axios
    .get(config.api_url + "/wp/v2/domaine-action?per_page=100")
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getAllDomainesImpacts = async () => {
  return axios
    .get(config.api_url + "/wp/v2/domaine-impact?per_page=100")
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
    .get(config.api_url + "/wp/v2/options/options-generales")
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

export const sendMail = async (body) => {
  return axios
    .post(config.api_url + "/wp/v2/contact/send", body)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      return err;
    });
};

export const getToken = async () => {
  const body = config.user;
  return axios
    .post(config.api_url + "/jwt-auth/v1/token", body)
    .then((response) => {
      return response.data.token;
    })
    .catch((err) => {
      return err;
    });
};

export const postComment = async (name, email, content, postId) => {
  return axios
    .post(
      config.api_url +
        "/wp/v2/comments?author_name=" +
        name +
        "&author_email=" +
        email +
        "&content=" +
        content +
        "&post=" +
        postId
    )
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err;
    });
};

export const addLikeView = async (type, postId, like, vues, token) => {
  vues = parseInt(vues) + 1;

  const body = {
    acf: {
      datas: { vues: vues.toString(), likes: like },
    },
  };

  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };
  return axios
    .post(config.api_url + "/wp/v2/" + type + "/" + postId, body, {
      headers: headers,
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err;
    });
};

export const checkCaptchaToken = async (token) => {
  const privateKey = process.env.REACT_APP_GOOGLE_CAPTCHA_PRIVATEKEY;
  const headers = {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };
  return axios
    .get(
      "https://www.google.com/recaptcha/api/siteverify?secret=" +
        privateKey +
        "&response=" +
        token,
      { headers: headers }
    )
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err;
    });
};
