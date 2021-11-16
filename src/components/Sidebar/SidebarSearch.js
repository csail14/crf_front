import React from "react";
import { GoSearch } from "react-icons/all";
import { Link } from "react-router-dom";

const SidebarSearch = (props) => {
  const handleChange = (e) => {
    props.loadKeywordsFilter(e.target.value);
  };

  return (
    <div className={"form_container"}>
      <form className={"sidebar_search"}>
        <div className={"sidebar_input"}>
          <input
            type="text"
            placeholder={"Rechercher"}
            onChange={handleChange}
          />
        </div>
        <Link
          to="/recherche"
          onClick={() => props.setShowMenu(false)}
          className={"sidebar_icon"}
        >
          <button type={"submit"}>
            <GoSearch />
          </button>
        </Link>
      </form>
    </div>
  );
};

export default SidebarSearch;
