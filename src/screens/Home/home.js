import React, { useState } from "react";
import { connect } from "react-redux";
import SearchBar from "../../components/Recherche/searchBar";
import styled from "styled-components";
import SubHomeBloc from "./subHomeBloc";
import { colors } from "../../colors";
import DOMPurify from "dompurify";
import { config } from "../../config";
import useMediaQuery from "@mui/material/useMediaQuery";

const MainContainer = styled.div`
  min-height: 100vh;
`;

const HeaderContainer = styled.header`
  padding: ${(props) => (props.isMobile ? "30px" : "80px 10%")};
  text-align: left;
  background-image: url(${config.header_image_url});
  background-size: cover;
  background-position:bottom right;
`;

const HeaderTitleContainer = styled.h1`
  font-size: 4.5rem;
  color: ${colors.marine};
  line-height: 58px;
  letter-spacing: 0em;
  text-transform: uppercase;
  margin: 0;
  font-weight:700;
`;

const HeaderSubTitleContainer = styled.h2`
  font-size: 4.5rem;
  color: ${colors.marine};
  line-height: 58px;
  letter-spacing: 0em;
  text-transform: uppercase;
  margin: 0;
  font-weight: 300;
`;

const SubtitleContainer = styled.p`
  margin-top: 26px;
  color: ${colors.gris};
`;
const BodyContainer = styled.main`
  display: flex;
  justify-content: center;
  padding-top: 20px;
  flex-wrap: ${(props) => (props.isMobile ? "wrap" : "")};
`;
const breakPoint = "900px";
const Home = (props) => {
  const isMobile = useMediaQuery(`(max-width:${breakPoint})`);
  const homeTemplate = props.pages.templates.length
    ? props.pages.templates.filter((template) => template.slug === "accueil")[0]
    : null;

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFilterSeledted, setIsFilterSelected] = useState(false);

  const toggleIsSearchOpen = (isOpen) => {
    setIsSearchOpen(isOpen);
  };

  const addQueryUrl = () => {
    let string = "?s=" + props.filters.keywords;
    if (string !== window.location.search && props.filters.keywords !== "") {
      props.history.push({
        search: "?s=" + props.filters.keywords,
      });
    }
  };

  return (
    <MainContainer>
      <HeaderContainer isMobile={isMobile}>
        {homeTemplate && homeTemplate.title ? (
          <HeaderTitleContainer
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(homeTemplate.title.rendered),
            }}
          />
        ) : (
          <HeaderTitleContainer>
            L'impact social des actions
          </HeaderTitleContainer>
        )}
        <HeaderSubTitleContainer>
          {" "}
          {homeTemplate
            ? homeTemplate.acf.sous_titre
            : "De la croix rouge française"}
        </HeaderSubTitleContainer>
        {homeTemplate && (
          <SubtitleContainer
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(homeTemplate.acf.intro),
            }}
          ></SubtitleContainer>
        )}
      </HeaderContainer>
      {!isMobile && (
        <SearchBar
          setIsFilterSelected={setIsFilterSelected}
          setIsSearchOpen={toggleIsSearchOpen}
          addQueryUrl={addQueryUrl}
        />
      )}
      <BodyContainer isMobile={isMobile}>
        {homeTemplate
          ? homeTemplate.acf.entrees.map((item, index) => {
              return (
                <SubHomeBloc
                  isSearchOpen={isSearchOpen}
                  key={index}
                  info={item}
                />
              );
            })
          : null}
      </BodyContainer>
    </MainContainer>
  );
};

const mapDispatchToProps = {};

const mapStateToProps = (store) => {
  return {
    pages: store.pages,
    filters: store.filters,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
