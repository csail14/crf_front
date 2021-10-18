import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { GoSearch } from "react-icons/go";
import styled from "styled-components";
import { Link } from "react-router-dom";

const KeyWordsContainer = styled.div`
  display: flex;
  padding: 5px;
  align-items: center;
`;

const MainContainer = styled.div`
  box-shadow: 0px 26px 70px rgba(0, 0, 0, 0.15);
  padding: 9px;
  margin: -18px 80px 0px 80px;
  background-color: white;
  text-align: left;
`;

const SearchBar = (props) => {
  return (
    <MainContainer>
      <KeyWordsContainer>
        {" "}
        <GoSearch />
        Rechercher une ressource par mots-cléfs...
      </KeyWordsContainer>
    </MainContainer>
  );
};

const mapDispatchToProps = {};

const mapStateToProps = (store) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
