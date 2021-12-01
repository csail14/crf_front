import React from "react";
import { FiMail, BsFillPersonFill } from "react-icons/all";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const AccountContact = (props) => {
  const location = useLocation();
  const url =
    props.contact_info &&
    props.contact_info.url.replace(process.env.REACT_APP_WP_LINK, "");
  return (
    <div className={"acc_contact_container"}>
      {props && props.contact_info && (
        <Link
          to={{ pathname: url, state: { from: location.pathname } }}
          target={props.contact_info.target}
          className={"contact_container"}
        >
          <FiMail className={"acc_contact_icon"} />
          {props.contact_info.title}
        </Link>
      )}
      <div className="account_container">
        <p>
          <BsFillPersonFill className={"acc_contact_icon"} />
          Austin Robertson
        </p>
        <a href="google.com">Se déconnecter</a>
      </div>
    </div>
  );
};

export default AccountContact;
