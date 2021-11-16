import React, { Component } from "react";
import { FiMail, BsFillPersonFill } from "react-icons/all";
import { colors } from "../../colors";
class AccountContact extends Component {
  render() {
    return (
      <div className={"acc_contact_container"}>
        <a href={"/contact"} className={"contact_container"}>
          <p>
            <FiMail className={"acc_contact_icon"} />
            {this.props && this.props.contact_info
              ? this.props.contact_info.title
              : "Je contacte l'équipe"}
          </p>
        </a>
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
  }
}

export default AccountContact;
