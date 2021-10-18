import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { GoSearch } from "react-icons/go";
import { BsChevronDown } from "react-icons/bs";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { colors } from "../../colors";

const KeyWordsContainer = styled.div`
  display: flex;
  padding: 9px 5px;
  align-items: center;
  border-right: 0.5px solid ${colors.gris};
  padding-right: 15px;
  color: ${colors.marine};
  font-weight: 500;
`;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 9px 22px;
  align-items: center;
  border-right: 0.5px solid ${colors.gris};
`;

const FilterTitle = styled.div`
  font-weight: 700;
  font-size: 12px;
  color: ${colors.marine};
  text-transform: uppercase;
`;

const FilterContent = styled.div`
  font-weight: 500;
  font-size: 16px;
  color: ${colors.marine};
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: -webkit-fill-available;
  cursor: pointer;
`;

const MainContainer = styled.div`
  display: flex;
  box-shadow: 0px 26px 70px rgba(0, 0, 0, 0.15);
  padding: 7px;
  margin: -32px auto 0px 80px;
  background-color: white;
  text-align: left;
  align-items: center;
  width: fit-content;
`;
const SearchButtonContainer = styled.div`
  padding: 15px 25px;
  color: white;
  background-color: ${colors.rouge};
  font-weight: 700;
  text-transform: uppercase;
  cursor: pointer;
`;

const SearchBar = (props) => {
  return (
    <MainContainer>
      <KeyWordsContainer>
        {" "}
        <GoSearch style={{ marginRight: "12px" }} />
        Rechercher une ressource par mots-cléfs...
      </KeyWordsContainer>
      <FilterContainer>
        <FilterTitle>Domaine d'action</FilterTitle>
        <FilterContent>
          Choisir <BsChevronDown />
        </FilterContent>
      </FilterContainer>
      <FilterContainer>
        {" "}
        <FilterTitle>Domaine d'impact</FilterTitle>
        <FilterContent>
          Choisir <BsChevronDown />
        </FilterContent>
      </FilterContainer>
      <FilterContainer style={{ border: "none" }}>
        {" "}
        <FilterTitle>Type de ressource</FilterTitle>
        <FilterContent>
          Choisir <BsChevronDown />
        </FilterContent>
      </FilterContainer>
      <SearchButtonContainer>rechercher</SearchButtonContainer>
    </MainContainer>
  );
};

const mapDispatchToProps = {};

const mapStateToProps = (store) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
