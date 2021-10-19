import React, {Component} from 'react';

class SidebarSearch extends Component {
    render() {
        return (
            <form>
                <input type="text" className={"sidebar_search"} placeholder={"Rechercher"}/>
            </form>
        );
    }
}

export default SidebarSearch;