import React, { useEffect, useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { Link } from "react-router-dom";

const Dropdown = (props) => {
  const [isOpen, setIsOpen] = useState(props.openID === props.id);

  const container = React.createRef();
  useEffect(() => {
    setIsOpen(props.openID === props.id);
  }, [props.openID]);

  // const handleButtonClick = () => {
  //   setIsOpen(!is)
  //   this.setState((state) => {
  //     return {
  //       open: this.props.openID === this.props.id,
  //     };
  //   });
  // };

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

  // componentDidMount() {
  //   document.addEventListener("mousedown", this.handleClickOutside);
  // }

  // componentWillUnmount() {
  //   document.removeEventListener("mousedown", this.handleClickOutside);
  // }

  // handleClickOutside = (event) => {
  //   if (
  //     this.container.current &&
  //     !this.container.current.contains(event.target)
  //   ) {
  //     this.setState({
  //       open: false,
  //     });
  //   }
  // };

  const placelink = (obj) => {
    return (
      <div key={obj.ID}>
        <Link
          key={obj.ID}
          to={
            obj.type_label === "Page"
              ? defineUrl(obj.url, obj.type_label, obj.slug)
              : {
                  pathname: defineUrl(obj.url, obj.type_label, obj.slug),
                  state: { id: obj.object_id },
                }
          }
          className={"dropdown_link_div"}
          onClick={() => props.openCloseDropDown(props.id)}
        >
          <p key={obj.id}>{obj.title}</p>
        </Link>
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
