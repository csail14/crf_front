import { getAllRessources } from "../api/RessourcesApi";
export const checkAllRessources = (allRessources, loadFunction) => {
  if (allRessources.length === 0) {
    getAllRessources().then((res) => {
      loadFunction(res);
    });
  }
};

export const replaceHostUrl = (string, type) => {
  const host = "http://" + window.location.host;
  if (string) {
    const replacedString = string.replace(process.env.REACT_APP_WP_LINK, host);
    return replacedString;
  } else return;
};

export const computeQuery = (keyword, types, date, cat, di, da, format) => {
  let query = "";
  if (keyword !== "") {
    query !== "" ? (query = query + "&") : (query = query);
    query = query + "s=" + keyword;
  }
  if (types.length === 1) {
    query !== "" ? (query = query + "&") : (query = query);
    query = query + "type=" + types[0].type;
  } else if (types.length > 0) {
    types.forEach((item, index) => {
      query !== "" ? (query = query + "&") : (query = query);
      let s = "type[]=" + item.type;
      index === types.length - 1 ? (s = s) : (s = s + "&");
      query = query + s;
    });
  }
  if (date.id !== 0) {
    query !== "" ? (query = query + "&") : (query = query);
    query = query + "date=" + date.value;
  }
  if (cat.length) {
    query !== "" ? (query = query + "&") : (query = query);
    query = query + "cat=";
    cat.forEach((item, index) => {
      let s = item.id;
      index === cat.length - 1 ? (s = s) : (s = s + ",");
      query = query + s;
    });
  }
  if (di.length) {
    di.forEach((item, index) => {
      query !== "" ? (query = query + "&") : (query = query);
      query = query + "di[]=";
      let s = item.id;
      index === di.length - 1 ? (s = s) : (s = s + "");
      query = query + s;
    });
  }
  if (da.length) {
    da.forEach((item, index) => {
      query !== "" ? (query = query + "&") : (query = query);
      query = query + "da[]=";
      let s = item.id;
      index === da.length - 1 ? (s = s) : (s = s + "");
      query = query + s;
    });
  }
  if (format.length && format[0].id !== 0) {
    query !== "" ? (query = query + "&") : (query = query);
    format.forEach((item, index) => {
      let s = "format[]=" + item.value;
      index === format.length - 1 ? (s = s) : (s = s + "&");
      query = query + s;
    });
  }

  return query;
};
