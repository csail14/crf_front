import React from "react";
import { GoSearch } from "react-icons/all";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
const SidebarSearch = (props) => {
  const handleChange = (e) => {
    props.loadKeywordsFilter(e.target.value);
  };
  let history = useHistory();

  return (
    <div className={"form_container"}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          history.push("/recherche/");
        }}
        className={"sidebar_search"}
      >
        <div className={"sidebar_input"}>
          <input
            type="text"
            placeholder={"Rechercher"}
            onChange={handleChange}
            value={props.keywords}
          />
        </div>
        <Link
          to="/recherche"
          onClick={() => props.setShowMenu(false)}
          className={"sidebar_icon"}
        >
          <GoSearch />
        </Link>
      </form>
    </div>
  );
};

export default SidebarSearch;
