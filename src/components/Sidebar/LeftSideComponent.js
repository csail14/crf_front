import React from "react";
import {connect} from "react-redux";
import logoBandeauCroixRouge from "../../assets/logoBandeauCroixRouge.svg";
import styled from "styled-components";
import {Link} from "react-router-dom";
import {colors} from "../../colors";
import SidebarSearch from "./SidebarSearch";
import AccountContact from "./account_contact";
import store from "../../store";
import Dropdown from "./Dropdown";

const list = {
    1: {
        title: "Je m'informe",
        links: [
            {
                title: "L'impact social à la CRF",
                link: "www.google.fr",
                id: 1
            },
            {
                title: "Mesurer l'impact social ?",
                link: "www.google.fr",
                id: 2
            },
            {
                title: "Le discours et la méthode",
                link: "www.google.fr",
                id: 3
            },
            {
                title: "Base de connaissance muspi merol",
                link: "www.google.fr",
                id: 4
            }
        ]
    },
    2: {
        title: "Je mesure",
        links: [
            {
                title: "Structurer ma mesure",
                link: "www.google.fr",
                id: 5
            },
            {
                title: "Choisir ma question",
                link: "www.google.fr",
                id: 6
            },
            {
                title: "Cartographier mes impacts",
                link: "www.google.fr",
                id: 7
            },
            {
                title: "Définir mes indicateurs",
                link: "www.google.fr",
                id: 8
            },
            {
                title: "Recueillir mes données",
                link: "www.google.fr",
                id: 9
            },
            {
                title: "Analyser mes impacts",
                link: "www.google.fr",
                id: 10
            },
            {
                title: "Communiquer mes impacts",
                link: "www.google.fr",
                id: 11
            },
            {
                title: "Accéder à impact track",
                link: "www.google.fr",
                id: 12
            },
        ]
    },
    3: {
        title: "Je transmets",
        links: [
            {
                title: "lorem ipsum",
                link: "www.google.fr",
                id: 13
            },
            {
                title: "lorem ipsum",
                link: "www.google.fr",
                id: 14
            }
        ]
    }
}

const ImageContainer = styled.div`
  margin: 22px 40px;
  cursor: pointer;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  background-color: ${colors.grisBackground};
  position: sticky;
  overflow: scroll;
  position: -webkit-sticky;
  top: 0;
`;

class LeftSideComponent extends React.Component {
    constructor(props) {
        super(props);
        store.subscribe(() => {
            this.setState({
                sidebarPages: store.getState().sidebarPages
            })
        })
    }

    componentDidMount() {
        this._ismounted = true;
    }

    componentWillUnmount() {
        this._ismounted = false;
    }

    render() {
        const getTitle = () => {
            if (this._ismounted){
                return this.state.sidebarPages.templates
            }else {
                return []
            }
        }
        return (
            <MainContainer className={"main_container"}>

                <div>
                    <ImageContainer>
                        <Link to="/home">
                            <img src={logoBandeauCroixRouge} alt="logoBandeauCroixRouge"/>
                        </Link>
                    </ImageContainer>
                    <div className={"sidebar_title"}>
                        <h1>PORTAIL DE MESURE D'IMPACT SOCIAL</h1>
                    </div>
                    <SidebarSearch/>
                    <div className={"dropdown_container"}>
                        {getTitle().map((item) => {
                            return <Dropdown title={item.title} />
                        })}
                    </div>
                </div>
                <AccountContact/>
            </MainContainer>
        );
    }
}

const mapDispatchToProps = {};

const mapStateToProps = (store) => {
    return {
        sidebarPages: store.sidebarPages
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LeftSideComponent);
