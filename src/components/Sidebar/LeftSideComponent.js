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
import { useOktaAuth } from "@okta/okta-react";
import { config } from "../../config";

const ImageContainer = styled.div`
  margin: 10px 0 0;
  padding: 23px 14% 0;
  cursor: pointer;
  transition: all 0.3s;
  background: white;
  &:hover {
    transform: scale(0.99);
  }
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

const BackIntranet = styled.a`
  display: flex;
  justify-content: flex-start;
  font-weight: bold;
  font-size: 1rem;
  line-height: 130%;
  text-transform: uppercase;
  color: #828282;
  padding: 21px 5% 0;
  cursor: pointer;
`;

const LeftSideComponent = (props) => {
  const { oktaAuth, authState } = useOktaAuth();
  const logout = async () => oktaAuth.signOut("/");
  const [userInfo, setUserInfo] = useState(null);
  const isMobile = useMediaQuery(`(max-width:${config.breakPoint})`);
  const [openID, setOpenId] = useState(null);
  const [sidebarPages, setSidebarPages] = useState(props.sidebarPages);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    setSidebarPages(props.sidebarPages);
  }, [props.sidebarPages]);

  useEffect(() => {
    console.log("oktaAuth", oktaAuth);

    if (authState && authState.isAuthenticated) {
      console.log("isAuthenticated", authState.isAuthenticated);
      oktaAuth.getUserInfo().then((info) => {
        setUserInfo(info);
        console.log("promise info", info);
      });
    }
  }, [oktaAuth]);

  const closeMenu = () => {
    setShowMenu(false);
  };

  const openCloseDropDown = (id) => {
    if (id === openID) {
      setOpenId(null);
    } else {
      setOpenId(id);
    }
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
  console.log(userInfo);
  return (
    <>
      {(isMobile && showMenu) || !isMobile ? (
        <MainContainer
          isMobile={isMobile}
          showMenu={showMenu}
          className={"main_container"}
        >
          <div>
            {props.options &&
              props.options.options &&
              props.options.options.retour_intranet && (
                <BackIntranet
                  href={props.options.options.retour_intranet.url}
                  target={props.options.options.retour_intranet.target}
                >
                  <i
                    className="bi bi-chevron-left"
                    style={{ marginRight: "13px" }}
                  />{" "}
                  {props.options.options.retour_intranet.title}
                </BackIntranet>
              )}
            {!isMobile &&
              props.options &&
              props.options.options &&
              props.options.options.logo && (
                <ImageContainer>
                  <Link to="/home">
                    <img
                      style={{ maxWidth: "188px" }}
                      src={props.options.options.logo.url}
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
              <Link to="/home" onClick={closeMenu}>
                <h1>
                  {" "}
                  {props.options &&
                    props.options.options &&
                    props.options.options.titre}
                </h1>{" "}
              </Link>
              {isMobile && (
                <i
                  className="bi bi-x-lg"
                  onClick={() => setShowMenu(!showMenu)}
                ></i>
              )}
            </div>
            <SidebarSearch
              loadKeywordsFilter={props.loadKeywordsFilter}
              setShowMenu={setShowMenu}
              keywords={props.filters.keywords}
            />
            <nav className={"dropdown_container"}>
              {getTitle().map((item) => {
                return (
                  <Dropdown
                    key={`dropdown_title${item.ID}`}
                    title={item.title}
                    url={item.url}
                    id={item.object_id}
                    openID={openID}
                    subItem={getSubItem(item.ID)}
                    type={item.type_label}
                    post_name={item.post_name}
                    closeMenu={closeMenu}
                    openCloseDropDown={openCloseDropDown}
                    slug={item.slug}
                  />
                );
              })}
            </nav>
          </div>
          <AccountContact
            contact_info={
              props.options &&
              props.options.options &&
              props.options.options.contact
            }
            logout={logout}
          />
        </MainContainer>
      ) : (
        <MainContainer
          isMobile={isMobile}
          showMenu={showMenu}
          className={"main_container"}
        >
          {props.options &&
            props.options.options &&
            props.options.options.retour_intranet && (
              <BackIntranet
                href={props.options.options.retour_intranet.url}
                target={props.options.options.retour_intranet.target}
                isMobile={isMobile}
              >
                <i
                  className="bi bi-chevron-left"
                  style={{ marginRight: "8px" }}
                />{" "}
                Retour à l'intranet
              </BackIntranet>
            )}
          <div className={"sidebar_title"}>
            {isMobile && (
              <Link to="/home">
                <img
                  src={logoMobile}
                  style={{ marginRight: "20px" }}
                  alt="logo-mobile"
                />
              </Link>
            )}
            <Link to="/home">
              {" "}
              <h1>PORTAIL DE MESURE D'IMPACT SOCIAL</h1>{" "}
            </Link>
            <i
              className="bi bi-list"
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
