import React from "react";
import { connect } from "react-redux";
import logoBandeauCroixRouge from "../../assets/logoBandeauCroixRouge.svg";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { colors } from "../../colors";
import SidebarSearch from "./SidebarSearch";
import AccountContact from "./account_contact";
import store from "../../store";
import Dropdown from "./Dropdown";
import OptionsReducer from "../../reducers/optionsReducer";

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
    this.state = { sidebarPages: null };
  }

  componentDidMount() {
    this._ismounted = true;
  }

  componentDidUpdate() {
    if (this.state.sidebarPages === null) {
      this.setState({
        sidebarPages: this.props.sidebarPages,
      });
    }
  }

  componentWillUnmount() {
    this._ismounted = false;
  }

  render() {
    const getTitle = () => {
      if (this._ismounted && this.state.sidebarPages) {
        let pages = this.state.sidebarPages.templates.filter(
          (item) => item.menu_item_parent === "0"
        );
        return pages;
      } else {
        return [];
      }
    };

    const getSubItem = (id) => {
      if (this._ismounted && this.state.sidebarPages) {
        let pages = this.state.sidebarPages.templates.filter(
          (item) => item.menu_item_parent === "" + id
        );
        return pages;
      } else {
        return [];
      }
    };

    return (
      <MainContainer className={"main_container"}>
        <div>
          <ImageContainer>
            <Link to="/home">
              <img
                style={{ maxWidth: "200px" }}
                src={
                  this.props.options &&
                  this.props.options.options &&
                  this.props.options.options.acf &&
                  this.props.options.options.acf.logo.url
                }
                alt="logoBandeauCroixRouge"
              />
            </Link>
          </ImageContainer>
          <div className={"sidebar_title"}>
            <Link to="/home" style={{ textDecoration: "none" }}>
              {" "}
              <h1>PORTAIL DE MESURE D'IMPACT SOCIAL</h1>{" "}
            </Link>
          </div>
          <SidebarSearch />
          <div className={"dropdown_container"}>
            {getTitle().map((item) => {
              return (
                <Dropdown
                  key={`dropdown_title${item.ID}`}
                  title={item.title}
                  url={item.url}
                  id={item.object_id}
                  subItem={getSubItem(item.ID)}
                  type={item.type_label}
                />
              );
            })}
          </div>
        </div>
        <AccountContact
          contact_info={
            this.props.options &&
            this.props.options.options &&
            this.props.options.options.acf &&
            this.props.options.options.acf.contact
          }
        />
      </MainContainer>
    );
  }
}

const mapDispatchToProps = {};

const mapStateToProps = (store) => {
  return {
    sidebarPages: store.sidebarPages,
    options: store.options,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LeftSideComponent);
