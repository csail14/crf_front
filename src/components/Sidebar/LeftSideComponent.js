import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { colors } from "../../colors";
import SidebarSearch from "./SidebarSearch";
import AccountContact from "./account_contact";
import Dropdown from "./Dropdown";
import useMediaQuery from "@mui/material/useMediaQuery";
import logoMobile from "../../assets/logo-mobile.png";
import { loadKeywordsFilter } from "./../../actions/filter/filterActions";
import { config } from "../../config";
const ImageContainer = styled.div`
  margin: 22px 20px 22px 8px;
  cursor: pointer;
`;

const MainContainer = styled.aside`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: ${(props) => (!props.showMenu && props.isMobile ? "" : "100vh")};
  background-color: ${colors.grisBackground};
  position: sticky;
  overflow: scroll;
  position: -webkit-sticky;
  top: 0;
  z-index: 2;
  max-width: ${(props) => (props.isMobile ? "" : "min-content")};
`;

const LeftSideComponent = (props) => {
  const isMobile = useMediaQuery(`(max-width:${config.breakPoint})`);

  const [sidebarPages, setSidebarPages] = useState(props.sidebarPages);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    setSidebarPages(props.sidebarPages);
  }, [props.sidebarPages]);

  const closeMenu = () => {
    setShowMenu(false);
  };

  const getTitle = () => {
    if (sidebarPages && sidebarPages.templates.length) {
      let pages = sidebarPages.templates.filter(
        (item) => item.menu_item_parent === "0"
      );
      return pages;
    } else {
      return [];
    }
  };

  const getSubItem = (id) => {
    if (sidebarPages && sidebarPages.templates.length) {
      let pages = sidebarPages.templates.filter(
        (item) => item.menu_item_parent === "" + id
      );
      return pages;
    } else {
      return [];
    }
  };

  return (
    <>
      {(isMobile && showMenu) || !isMobile ? (
        <MainContainer
          isMobile={isMobile}
          showMenu={showMenu}
          className={"main_container"}
        >
          <div>
            {!isMobile && (
              <ImageContainer>
                <Link to="/home">
                  <img
                    style={{ maxWidth: "200px" }}
                    src={
                      props.options &&
                      props.options.options &&
                      props.options.options.acf &&
                      props.options.options.acf.logo.url
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
                onClick={closeMenu}
              >
                <h1>PORTAIL DE MESURE D'IMPACT SOCIAL</h1>{" "}
              </Link>
              {isMobile && (
                <i
                  class="bi bi-x-lg"
                  onClick={() => setShowMenu(!showMenu)}
                ></i>
              )}
            </div>
            <SidebarSearch
              loadKeywordsFilter={props.loadKeywordsFilter}
              setShowMenu={setShowMenu}
            />
            <nav className={"dropdown_container"}>
              {getTitle().map((item) => {
                return (
                  <Dropdown
                    key={`dropdown_title${item.ID}`}
                    title={item.title}
                    url={item.url}
                    id={item.object_id}
                    subItem={getSubItem(item.ID)}
                    type={item.type_label}
                    post_name={item.post_name}
                    closeMenu={closeMenu}
                  />
                );
              })}
            </nav>
          </div>
          <AccountContact
            contact_info={
              props.options &&
              props.options.options &&
              props.options.options.acf &&
              props.options.options.acf.contact
            }
          />
        </MainContainer>
      ) : (
        <MainContainer
          isMobile={isMobile}
          showMenu={showMenu}
          className={"main_container"}
        >
          {" "}
          <div className={"sidebar_title"}>
            {isMobile && (
              <Link to="/home" style={{ textDecoration: "none" }}>
                <img
                  src={logoMobile}
                  style={{ marginRight: "20px" }}
                  alt="logo-mobile"
                />
              </Link>
            )}
            <Link to="/home" style={{ textDecoration: "none" }}>
              {" "}
              <h1>PORTAIL DE MESURE D'IMPACT SOCIAL</h1>{" "}
            </Link>
            <i
              class="bi bi-list"
              style={{ fontSize: "30px" }}
              onClick={() => setShowMenu(!showMenu)}
            ></i>
          </div>
        </MainContainer>
      )}
    </>
  );
};

const mapDispatchToProps = { loadKeywordsFilter };

const mapStateToProps = (store) => {
  return {
    sidebarPages: store.sidebarPages,
    options: store.options,
    filters: store.filters,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LeftSideComponent);
