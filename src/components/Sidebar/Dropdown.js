import React, { useEffect, useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Dropdown = (props) => {
  const [isOpen, setIsOpen] = useState(props.openID === props.id);
  const [pathName, setPathName] = useState("");
  let history = useHistory();
  const location = useLocation();
  const container = React.createRef();
  useEffect(() => {
    setIsOpen(props.openID === props.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.openID]);

  useEffect(() => {
    if (location.pathname !== pathName) {
      setPathName(location.pathname);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const defineUrl = (long_url, type, slug) => {
    if (type === "Page") {
      return "/" + slug;
    } else if (type === "Article") {
      return "/articles/" + slug;
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
        state: { id: obj.object_id },
      });
      props.setShowMenu(false);
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
      </div>
    );
  };

  const url = defineUrl(props.url, props.type, props.slug);

  return (
    <div className={"container"} ref={container}>
      <Link
        to={url}
        className={"dropdown_div"}
        onClick={() => {
          props.openCloseDropDown(props.id);
        }}
      >
        <span
          className={"dropdown_text dropdown_title"}
          onClick={() => props.setShowMenu(false)}
        >
          {props.title}
        </span>
        <span className={"arrow_icon"}>
          {!isOpen && <BsChevronDown />}
          {isOpen && <BsChevronUp />}
        </span>
      </Link>

      {isOpen && (
        <div className={"dropdown"}>
          {props.subItem.map((link) => {
            if (link.post_status === "publish") return placelink(link);
            return undefined;
          })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
