import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import logoBandeauCroixRouge from "../assets/logoBandeauCroixRouge.svg";
import styled from "styled-components";
import { Link } from "react-router-dom";

const ImageContainer = styled.div`
  margin: 22px 40px;
  cursor: pointer;
`;

const MainContainer = styled.div`
  min-height: 100vh;
  background-color: #f7f9fa;
`;

const LeftSideComponent = (props) => {
  console.log("props", window.history);
  return (
    <MainContainer>
      <ImageContainer>
        <Link to="/home">
          <img src={logoBandeauCroixRouge} alt="logoBandeauCroixRouge" />
        </Link>
      </ImageContainer>
    </MainContainer>
  );
};

const mapDispatchToProps = {};

const mapStateToProps = (store) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(LeftSideComponent);
