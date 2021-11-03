import React, { Component } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { Link } from "react-router-dom";

class Dropdown extends Component {
  container = React.createRef();
  state = {
    open: false,
  };
  handleButtonClick = () => {
    this.setState((state) => {
      return {
        open: !state.open,
      };
    });
  };

  defineUrl = (long_url, type, id = null) => {
    const url = long_url.replace("https://pmis-wp.laguildedupixel.fr", "");
    if (type === "Page") {
      if (url === "/liste-des-indicateurs/" || url === "/impact-track/") {
        return url;
      } else {
        return "/subHome" + url;
      }
    } else if (type === "Article") {
      return "/post/" + id;
    } else if (type === "Document") {
      return "/documents/" + id;
    } else if (type === "Indicateur") {
      return "/indicateurs/" + id;
    } else return "/";
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    if (
      this.container.current &&
      !this.container.current.contains(event.target)
    ) {
      this.setState({
        open: false,
      });
    }
  };

  placelink = (obj) => {
    return (
      <div key={obj.id}>
        <Link
          key={obj.id}
          to={this.defineUrl(obj.url, obj.type_label, obj.object_id)}
          className={"dropdown_link_div"}
          onClick={this.props.closeMenu}
        >
          <p>{obj.title}</p>
        </Link>
        <br />
      </div>
    );
  };

  render() {
    const url = this.defineUrl(this.props.url, this.props.type, this.props.id);
    return (
      <div className={"container"} ref={this.container}>
        <Link
          style={{ textDecoration: "none" }}
          to={url}
          className={"dropdown_div"}
          onClick={this.handleButtonClick}
        >
          <p className={"dropdown_text dropdown_title"}>{this.props.title}</p>
          <p className={"arrow_icon"}>
            {!this.state.open && <BsChevronDown />}
            {this.state.open && <BsChevronUp />}
          </p>
        </Link>

        {this.state.open && (
          <div className={"dropdown"}>
            {this.props.subItem.map((link) => {
              if (link.post_status === "publish") return this.placelink(link);
            })}
          </div>
        )}
      </div>
    );
  }
}

export default Dropdown;
