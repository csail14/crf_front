import React, { useState } from "react";
import { connect } from "react-redux";
import { GoSearch } from "react-icons/go";
import { BsChevronDown } from "react-icons/bs";
import styled from "styled-components";

import { colors } from "../../colors";
import { data } from "../../utils/data";
import SimpleFilterItem from "./simpleFilterItem";
import ComplexeFilterItem from "./complexeFilterItem";
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
  position: relative;
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

const FilterOptionsContainer = styled.div`
  font-size: 16px;
  line-height: 21px;
  text-align: left;
  position: absolute;
  top: 60px;
  left: 0px;
  box-shadow: 0px 26px 70px rgba(0, 0, 0, 0.15);
  z-index: 1;
  display: flex;
  flex-direction: column;
  width: max-content;
`;
const FilterOptions = styled.div`
  background-color: ${(props) => (props.isSelected ? colors.marine : "white")};
  color: ${(props) => (props.isSelected ? "white" : colors.gris)};
  display: flex;
  justify-content: space-between;
  padding: 15px 20px;
  flex-wrap: no-wrap;
`;
const categorieAll = { id: 0, name: "Toutes les catégories" };

const SearchBar = (props) => {
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState([]);
  const [showFormatOptions, setShowFormatOptions] = useState(false);
  const [selectedType, setSelectedType] = useState([]);
  const [showTypeOptions, setShowTypeOptions] = useState(false);
  const [selectedCategorie, setSelectedCategorie] = useState([]);
  const [showCategorieOptions, setShowCategorieOptions] = useState(false);
  const [selectedDate, setSelectedDate] = useState(data.date_ressources[0]);
  const [showDateOptions, setShowDateOptions] = useState(false);
  const [selectedImpacts, setSelectedImpacts] = useState([]);
  const [showImpactsOptions, setShowImpactsOptions] = useState(false);
  const [selectedActions, setSelectedActions] = useState([]);
  const [showActionsOptions, setShowActionsOptions] = useState(false);

  const toggleCategorieOptions = () => {
    setShowCategorieOptions(!showCategorieOptions);
  };

  const toggleImpactsOptions = () => {
    setShowImpactsOptions(!showImpactsOptions);
  };

  const toggleActionsOptions = () => {
    setShowActionsOptions(!showActionsOptions);
  };

  const toggleDateOptions = () => {
    setShowDateOptions(!showDateOptions);
  };

  const handleChangeDate = (item) => {
    setSelectedDate(item);
    setShowDateOptions(false);
  };

  const toggleTypeOptions = () => {
    setShowTypeOptions(!showTypeOptions);
  };

  const toggleFormatOptions = () => {
    setShowFormatOptions(!showFormatOptions);
  };

  const toggleAdvancedSearch = () => {
    setShowAdvancedSearch(!showAdvancedSearch);
  };
  const categoriesOptions = () => {
    let array = [];
    props.taxonomie.categories
      ? props.taxonomie.categories.forEach((item) => array.push(item))
      : array.push();
    array.unshift(categorieAll);
    return array;
  };
  const categoriesData = categoriesOptions();

  const isArticleSelected =
    selectedType.filter((item) => item.id === 3).length > 0;

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

      <ComplexeFilterItem
        selectedObject={selectedActions}
        setSelectedObject={setSelectedActions}
        toggleOptions={toggleActionsOptions}
        showOptions={showActionsOptions}
        title={"Domaine d'action"}
        data={props.taxonomie && props.taxonomie.domainesActions}
        default="Choisir"
      />

      <ComplexeFilterItem
        selectedObject={selectedImpacts}
        setSelectedObject={setSelectedImpacts}
        toggleOptions={toggleImpactsOptions}
        showOptions={showImpactsOptions}
        title={"Domaine d'impact"}
        data={props.taxonomie && props.taxonomie.domainesImpacts}
        default="Choisir"
      />
      <SimpleFilterItem
        selectedObject={selectedType}
        setSelectedObject={setSelectedType}
        toggleOptions={toggleTypeOptions}
        showOptions={showTypeOptions}
        title={"Type de ressource"}
        data={data.type_ressources}
        default="Dans tout le site"
      />
      <SearchButtonContainer>rechercher</SearchButtonContainer>
      <ToggleContainer onClick={toggleAdvancedSearch}>
        Recherche avancée
      </ToggleContainer>
      {showAdvancedSearch && (
        <AdvancedSearchBarContainer>
          <AdvancedSearchBar>
            {isArticleSelected && (
              <SimpleFilterItem
                selectedObject={selectedCategorie}
                setSelectedObject={setSelectedCategorie}
                toggleOptions={toggleCategorieOptions}
                showOptions={showCategorieOptions}
                title={"Catégorie"}
                data={categoriesData}
                default="Toutes les catégories"
              />
            )}
            <SimpleFilterItem
              selectedObject={selectedFormat}
              setSelectedObject={setSelectedFormat}
              toggleOptions={toggleFormatOptions}
              showOptions={showFormatOptions}
              title={"Format"}
              data={data.format_ressources}
              default="Tous les formats"
            />
            <FilterContainer style={{ border: "none" }}>
              <FilterTitle>Date de publication</FilterTitle>
              <FilterContent onClick={toggleDateOptions}>
                {selectedDate.name}{" "}
                <BsChevronDown style={{ marginLeft: "10px" }} />
              </FilterContent>
              {showDateOptions && (
                <FilterOptionsContainer>
                  {data.date_ressources.map((item, index) => {
                    let isSelected = selectedDate.name === item.name;
                    return (
                      <FilterOptions
                        isSelected={isSelected}
                        onClick={() => handleChangeDate(item)}
                        className="search_options"
                        key={index}
                      >
                        {item.name}{" "}
                        <i
                          style={{ marginLeft: "10px" }}
                          className={item.icon}
                        ></i>
                      </FilterOptions>
                    );
                  })}
                </FilterOptionsContainer>
              )}
            </FilterContainer>
          </AdvancedSearchBar>
        </AdvancedSearchBarContainer>
      )}
    </MainContainer>
  );
};

const mapDispatchToProps = {};

const mapStateToProps = (store) => {
  return { taxonomie: store.taxonomie };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
