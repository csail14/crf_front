import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { colors } from "../../colors";
import SidebarSearch from "./SidebarSearch";
import AccountContact from "./account_contact";
import Dropdown from "./Dropdown";
import { isMobile } from "react-device-detect";
import logoMobile from "../../assets/logo-mobile.png";

const ImageContainer = styled.div`
  margin: 22px 40px;
  cursor: pointer;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: ${(props) => (!props.showMenu && isMobile ? "" : "100vh")};
  background-color: ${colors.grisBackground};
  position: sticky;
  overflow: scroll;
  position: -webkit-sticky;
  top: 0;
  z-index: 2;
`;

class LeftSideComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sidebarPages: null, showMenu: false };
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
  closeMenu = () => {
    this.setState({ showMenu: false });
  };

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
      <>
        {(isMobile && this.state.showMenu) || !isMobile ? (
          <MainContainer
            showMenu={this.state.showMenu}
            className={"main_container"}
          >
            <div>
              {!isMobile && (
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
              )}
              <div className={"sidebar_title"}>
                {isMobile && (
                  <img
                    src={logoMobile}
                    style={{ marginRight: "20px" }}
                    alt="logo-mobile"
                  />
                )}
                <Link
                  to="/home"
                  style={{ textDecoration: "none" }}
                  onClick={this.closeMenu}
                >
                  <h1>PORTAIL DE MESURE D'IMPACT SOCIAL</h1>{" "}
                </Link>
                {isMobile && (
                  <i
                    class="bi bi-x-lg"
                    onClick={() =>
                      this.setState({ showMenu: !this.state.showMenu })
                    }
                  ></i>
                )}
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
                      closeMenu={this.closeMenu}
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
        ) : (
          <MainContainer className={"main_container"}>
            {" "}
            <div className={"sidebar_title"}>
              {isMobile && (
                <img
                  src={logoMobile}
                  style={{ marginRight: "20px" }}
                  alt="logo-mobile"
                />
              )}
              <Link to="/home" style={{ textDecoration: "none" }}>
                {" "}
                <h1>PORTAIL DE MESURE D'IMPACT SOCIAL</h1>{" "}
              </Link>
              <i
                class="bi bi-list"
                style={{ fontSize: "30px" }}
                onClick={() =>
                  this.setState({ showMenu: !this.state.showMenu })
                }
              ></i>
            </div>
          </MainContainer>
        )}
      </>
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
