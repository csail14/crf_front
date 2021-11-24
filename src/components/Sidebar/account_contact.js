import React from "react";
import { FiMail, BsFillPersonFill } from "react-icons/all";
import { colors } from "../../colors";

const AccountContact = (props) => {
  const url =
    props.contact_info &&
    props.contact_info.url.replace(process.env.REACT_APP_WP_LINK, "");

  return (
    <div className={"acc_contact_container"}>
      {props && props.contact_info && (
        <a
          href={url}
          target={props.contact_info.target}
          className={"contact_container"}
        >
          <p>
            <FiMail className={"acc_contact_icon"} />
            {props.contact_info.title}
          </p>
        </a>
      )}
      <hr />
      <div className="account_container">
        <p>
          <BsFillPersonFill className={"acc_contact_icon"} />
          Austin Robertson
        </p>
        <a style={{ color: colors.gris, marginTop: "5px" }} href="google.com">
          Se déconnecter
        </a>
      </div>
    </div>
  );
};

export default AccountContact;
