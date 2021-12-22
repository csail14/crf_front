import React, { useState } from "react";
import { connect } from "react-redux";
import SearchBar from "../../components/Recherche/searchBar";
import styled from "styled-components";
import SubHomeBloc from "./subHomeBloc";
import { colors } from "../../colors";
import DOMPurify from "dompurify";
import { config } from "../../config";
import header from "../../assets/header.jpeg";
import useMediaQuery from "@mui/material/useMediaQuery";

const MainContainer = styled.div`
  min-height: 100vh;
`;

const HeaderContainer = styled.header`
  padding: ${(props) => (props.isMobile ? "55px 6%" : "121px 9% 58px")};
  min-height: 378px;
  background-image: url(${header});
  background-size: cover;
  background-position: bottom right;
  & + #el {
    width: 90%;
  }
  @media screen and (max-width:1024px){
    min-height:auto;

  }
`;

const HeaderTitleContainer = styled.h1`
  font-size: 4.5rem;
  color: ${colors.marine};
  line-height: 50px;
  letter-spacing: 0.07rem;
  text-transform: uppercase;
  margin: 0;
  font-weight: 700;
  @media screen and (max-width:1024px){
    font-size: 2.4rem;
    line-height:1.4;
  }
`;

const HeaderSubTitleContainer = styled.h2`
  font-size: 3rem;
  color: ${colors.marine};
  line-height: 42px;
  letter-spacing: 0.01em;
  text-transform: uppercase;
  margin: 0 0 34px;
  font-weight: 300;
  @media screen and (max-width:1024px){
    font-size: 2rem;
    line-height:1.3;
    margin-bottom:20px;
  }
`;

const SubtitleContainer = styled.div`
  margin-top: 26px;
  color: ${colors.gris};
  max-width: 800px;
  line-height: 1.8;
`;
const BodyContainer = styled.main`
  display: flex;
  width: 90%;
  max-width: 1350px;
  justify-content: space-between;
  padding: 73px 0 96px 0;
  margin: auto;
  @media screen and (max-width:1024px){
   flex-direction:column;
   padding-bottom:30px;
  }
  @media screen and (max-width:1280px){
    flex-wrap:wrap;
  }
`;
const breakPoint = "1024px";
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
      
        <SearchBar
          setIsFilterSelected={setIsFilterSelected}
          setIsSearchOpen={toggleIsSearchOpen}
          addQueryUrl={addQueryUrl}
        />
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
