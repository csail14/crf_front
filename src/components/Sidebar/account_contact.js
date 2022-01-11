import React from "react";
import { FiMail, BsFillPersonFill } from "react-icons/all";
import { useOktaAuth } from "@okta/okta-react";

const AccountContact = (props) => {
  const { authState } = useOktaAuth();
  const url = props.contact_info && props.contact_info.url;

  return (
    <div className={"acc_contact_container"}>
      {props && props.contact_info && (
        <a
          href={url}
          //to={{ pathname: url, state: { from: location.pathname } }}
          target={props.contact_info.target}
          className={"contact_container"}
        >
          <FiMail className={"acc_contact_icon"} />
          {props.contact_info.title}
        </a>
      )}
      <div className="account_container">
        <p>
          <BsFillPersonFill className={"acc_contact_icon"} />
          {authState?.idToken?.claims?.name ?? "Non connecté"}
        </p>
        <a onClick={props.logout}>Se déconnecter</a>
      </div>
    </div>
  );
};

export default AccountContact;
