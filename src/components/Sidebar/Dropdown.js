import React, { useEffect, useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Dropdown = (props) => {
  const [isOpen, setIsOpen] = useState(props.openID === props.id);
  const [pathName, setPathName] = useState("");
  let history = useHistory();
  const container = React.createRef();
  useEffect(() => {
    setIsOpen(props.openID === props.id);
  }, [props.openID]);

  useEffect(() => {
    setPathName(window.location.pathname);
  }, [window.location.pathname]);

  const defineUrl = (long_url, type, slug) => {
    const url = long_url.replace(process.env.REACT_APP_WP_LINK, "");

    if (type === "Page") {
      return url;
    } else if (type === "Article") {
      return "/post/" + slug;
    } else if (type === "Document") {
      return "/documents/" + slug;
    } else if (type === "Indicateur") {
      return "/indicateurs/" + slug;
    } else return "/";
  };

  const placelink = (obj) => {
    const url = defineUrl(obj.url, obj.type_label, obj.slug);
    const isSelected = url === pathName;
    const handleClick = () => {
      history.push({
        pathname: url,
        state: { id: obj.ID },
      });
    };
    return (
      <div key={obj.ID}>
        <div
          key={obj.ID}
          className={
            isSelected
              ? "dropdown_link_div dropdown_link_div_selected"
              : "dropdown_link_div"
          }
          onClick={handleClick}
        >
          <p key={obj.id}>{obj.title}</p>
        </div>
        <br />
      </div>
    );
  };

  const url = defineUrl(props.url, props.type, props.slug);

  return (
    <div className={"container"} ref={container}>
      <Link
        style={{ textDecoration: "none" }}
        to={url}
        className={"dropdown_div"}
        onClick={() => props.openCloseDropDown(props.id)}
      >
        <p className={"dropdown_text dropdown_title"}>{props.title}</p>
        <p className={"arrow_icon"}>
          {!isOpen && <BsChevronDown />}
          {isOpen && <BsChevronUp />}
        </p>
      </Link>

      {isOpen && (
        <div className={"dropdown"}>
          {props.subItem.map((link) => {
            if (link.post_status === "publish") return placelink(link);
          })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
