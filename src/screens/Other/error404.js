import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { config } from "../../config";
import useMediaQuery from "@mui/material/useMediaQuery";
import header from "../../assets/header.jpeg";

const MainContainer = styled.div`
  min-height: 92vh;
`;

const HeaderContainer = styled.header`
  padding: ${(props) => (props.isMobile ? "55px 6%" : "121px 12% 58px")};
  background-image: url(${header});
  background-size: cover;
  background-position: bottom right;
`;

const BodyContainer = styled.main`
  display: flex;
  justify-content: center;
  flex-wrap: ${(props) => (props.isMobile ? "wrap" : "")};
`;

const OtherPage = (props) => {
  const isMobile = useMediaQuery(`(max-width:${config.breakPoint})`);

  return (
    <MainContainer>
      <HeaderContainer isMobile={isMobile}>
        <h1 id="error-404">Cette page n'existe pas</h1>{" "}
      </HeaderContainer>

      <BodyContainer
        className="bodyContent"
        isMobile={isMobile}
      ></BodyContainer>
    </MainContainer>
  );
};

const mapDispatchToProps = {};

const mapStateToProps = (store) => {
  return { pages: store.pages };
};

export default connect(mapStateToProps, mapDispatchToProps)(OtherPage);
