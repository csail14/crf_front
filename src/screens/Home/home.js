import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import SearchBar from "../../components/Recherche/searchBar";
import styled from "styled-components";
import header from "../../assets/header.jpeg";
import { colors } from "../../colors";
const MainContainer = styled.div`
  min-height: 100vh;
`;

const HeaderContainer = styled.div`
  padding: 80px 140px;
  text-align: left;
  background-image: url(${header});
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
`;

const Home = (props) => {
  return (
    <MainContainer>
      <HeaderContainer>
        <HeaderTitleContainer style={{ fontWeight: "700" }}>
          L'impact social des actions
        </HeaderTitleContainer>
        <HeaderTitleContainer>De la croix rouge française</HeaderTitleContainer>
        <SubtitleContainer>
          Mattis sodales lacus tincidunt varius. Quis justo, purus nullam urna
          pulvinar. Vitae vehicula posuere nulla in sed. Malesuada posuere
          velit, justo pretium magna interdum.
        </SubtitleContainer>
      </HeaderContainer>
      <SearchBar />
    </MainContainer>
  );
};

const mapDispatchToProps = {};

const mapStateToProps = (store) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
