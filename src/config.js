export const config = {
  breakPoint: "1024px",
  api_url: process.env.REACT_APP_ENV_API_LINK,
  header_image_url:
    process.env.REACT_APP_WP_LINK + "/wp-content/uploads/2021/10/header.jpeg",
  user: {
    username: process.env.REACT_APP_USER,
    password: process.env.REACT_APP_USER_PASSWORD,
  },
  okta: {
    client_id : process.env.REACT_APP_OKTA_CLIENT_ID,
    issuer: process.env.REACT_APP_OKTA_ISSUER,
    secure: process.env.REACT_APP_OKTA_ACTIVE 
  }
};
