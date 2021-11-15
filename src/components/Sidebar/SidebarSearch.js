import React, { Component } from "react";
import { GoSearch } from "react-icons/all";
import { Link } from "react-router-dom";

class SidebarSearch extends Component {
  render() {
    return (
      <div className={"form_container"}>
        <form className={"sidebar_search"}>
          <div className={"sidebar_input"}>
            <input type="text" placeholder={"Rechercher"} />
          </div>
          <Link
            to="/recherche"
            onClick={() => this.props.setShowMenu(false)}
            className={"sidebar_icon"}
          >
            <button type={"submit"}>
              <GoSearch />
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

export default SidebarSearch;
