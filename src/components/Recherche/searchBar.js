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
  color: ${colors.gris};
  font-weight: 500;
`;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 22px;
  line-height: 20px;
  border-right: 0.5px solid ${colors.gris};
`;

const FilterTitle = styled.div`
  font-weight: 700;
  font-size: 12px;
  color: ${colors.gris};
  text-align: left;
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
  margin: ${(props) =>
    props.showAdvancedSearch ? "-32px auto 70px auto" : "-32px auto 0px auto"};
  background-color: white;
  text-align: left;
  align-items: center;
  width: fit-content;
  position: relative;
`;
const SearchButtonContainer = styled.div`
  padding: 16px 25px;
  color: white;
  background-color: ${colors.rouge};
  font-weight: 700;
  text-transform: uppercase;
  cursor: pointer;
`;

const AdvancedSearchBar = styled.div`
  display: flex;
  box-shadow: 0px 26px 70px rgba(0, 0, 0, 0.15);
  padding: 7px;
  margin: 10px auto 0px auto;
  background-color: white;
  text-align: left;
  width: fit-content;
`;

const AdvancedSearchBarContainer = styled.div`
  display: flex;
  margin: auto;
  position: absolute;
  bottom: -75px;
  left: 0;
`;
const ToggleContainer = styled.div`
  text-decoration: underline;
  position: absolute;
  bottom: -27px;
  right: 0;
  color: ${colors.rouge};
  text-transform: uppercase;
  font-weight: 700;
  font-size: 13px;
  margin: 10px 5px 0px auto;
  cursor: pointer;
`;

const SearchBar = (props) => {
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);

  const toggleAdvancedSearch = () => {
    setShowAdvancedSearch(!showAdvancedSearch);
  };
  return (
    <MainContainer showAdvancedSearch={showAdvancedSearch}>
      <KeyWordsContainer>
        <GoSearch style={{ marginRight: "12px" }} />
        <input
          type="text"
          className="recherche_input"
          placeholder={"Rechercher une ressource par mots-cléfs..."}
        />{" "}
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
      <ToggleContainer onClick={toggleAdvancedSearch}>
        Recherche avancée
      </ToggleContainer>
      {showAdvancedSearch && (
        <AdvancedSearchBarContainer>
          <AdvancedSearchBar>
            <FilterContainer>
              <FilterTitle>Catégorie</FilterTitle>
              <FilterContent>
                Toutes les catégories <BsChevronDown />
              </FilterContent>
            </FilterContainer>
            <FilterContainer>
              <FilterTitle>Format</FilterTitle>
              <FilterContent>
                Tous les formats <BsChevronDown />
              </FilterContent>
            </FilterContainer>
            <FilterContainer style={{ border: "none" }}>
              <FilterTitle>Date de publication</FilterTitle>
              <FilterContent>
                Moins d'un mois <BsChevronDown />
              </FilterContent>
            </FilterContainer>
          </AdvancedSearchBar>
        </AdvancedSearchBarContainer>
      )}
    </MainContainer>
  );
};

const mapDispatchToProps = {};

const mapStateToProps = (store) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
