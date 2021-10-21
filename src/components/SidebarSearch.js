import React, {Component} from 'react';
import {GoSearch} from "react-icons/all";

class SidebarSearch extends Component {
    render() {
        return (
            <div className={"form_container"}>
                <form className={"sidebar_search"}>
                    <div className={"sidebar_input"}>
                        <input type="text" placeholder={"Rechercher"}/>
                    </div>
                    <div className={"sidebar_icon"}>
                        <button type={"submit"}><GoSearch/></button>
                    </div>
                </form>
            </div>
        );
    }
}

export default SidebarSearch;