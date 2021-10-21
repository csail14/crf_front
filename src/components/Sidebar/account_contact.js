import React, {Component} from 'react';
import {FiMail, BsFillPersonFill} from "react-icons/all";
class AccountContact extends Component {
    render() {
        return (
            <div className={"acc_contact_container"}>
                 <a href={"/contact"} className={"contact_container"}>
                    <p>
                        <FiMail className={"acc_contact_icon"}/>
                        Je contacte l'équipe
                    </p>
                </a>
                <div className="account_container">
                    <p>
                        <BsFillPersonFill className={"acc_contact_icon"}/>
                        Austin Robertson
                    </p>
                    <a href="google.com">Se déconnecter</a>

                </div>
                {/*<div className="account_container">*/}
                {/*        <p><BsFillPersonFill className={"acc_contact_icon"}/>Austin Robertson</p>*/}
                {/*        <a href="google.com">Se déconnecter</a>*/}
                {/*</div>*/}
            </div>
        );
    }
}

export default AccountContact;