import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import SearchBar from "../../components/Recherche/searchBar";
import styled from "styled-components";
import union from "../../assets/union.png";
import SubHomeBloc from "./subHomeBloc";
import { colors } from "../../colors";
const MainContainer = styled.div`
  min-height: 100vh;
`;

const HeaderContainer = styled.div`
  padding: 80px 140px;
  text-align: left;
  background: radial-gradient(
      68.37% 320.65% at -18.36% 111.75%,
      rgba(0, 57, 86, 0.5) 0%,
      rgba(0, 57, 86, 0.19) 44.84%,
      rgba(255, 255, 255, 0.09) 100%
    ),
    radial-gradient(
      132.83% 171.01% at 94.89% 166.27%,
      rgba(227, 6, 19, 0.33) 0%,
      rgba(227, 6, 19, 0.219) 46.47%,
      rgba(255, 255, 255, 0.108) 100%
    );
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
const BodyContainer = styled.div`
  display: flex;
  justify-content: center;
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
      <BodyContainer>
        <SubHomeBloc />
        <SubHomeBloc />
        <SubHomeBloc />
      </BodyContainer>
    </MainContainer>
  );
};

const mapDispatchToProps = {};

const mapStateToProps = (store) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
