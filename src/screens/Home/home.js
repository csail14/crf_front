import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import SearchBar from "../../components/Recherche/searchBar";
import styled from "styled-components";
import union from "../../assets/union.png";
import header from "./../../assets/header.jpeg";
import SubHomeBloc from "./subHomeBloc";
import { colors } from "../../colors";
import DOMPurify from "dompurify";

const MainContainer = styled.div`
  min-height: 100vh;
`;

const HeaderContainer = styled.div`
  padding: 80px 140px;
  text-align: left;
  background-image: url("https://pmis-wp.laguildedupixel.fr/wp-content/uploads/2021/10/header.jpeg");
  background-size: cover;
`;

const HeaderTitleContainer = styled.div`
  font-size: 45px;
  color: ${colors.marine};
  line-height: 58px;
  letter-spacing: 0em;
  text-transform: uppercase;
`;

const SubtitleContainer = styled.div`
  margin-top: 26px;
  color: ${colors.gris};
`;
const BodyContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Home = (props) => {
  const homeTemplate = props.pages.templates.length
    ? props.pages.templates.filter((template) => template.slug === "accueil")[0]
    : null;

  return (
    <MainContainer>
      <HeaderContainer>
        <HeaderTitleContainer style={{ fontWeight: "700" }}>
          {homeTemplate
            ? homeTemplate.title.rendered
            : "L'impact social des actions"}
        </HeaderTitleContainer>
        <HeaderTitleContainer>
          {" "}
          {homeTemplate
            ? homeTemplate.acf.sous_titre
            : "De la croix rouge française"}
        </HeaderTitleContainer>
        {homeTemplate && (
          <SubtitleContainer
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(homeTemplate.acf.intro),
            }}
          ></SubtitleContainer>
        )}
      </HeaderContainer>
      <SearchBar />
      <BodyContainer>
        {homeTemplate
          ? homeTemplate.acf.entrees.map((item, index) => {
              return <SubHomeBloc key={index} info={item} />;
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
