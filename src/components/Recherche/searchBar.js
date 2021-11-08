import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { GoSearch } from "react-icons/go";
import { BsChevronDown } from "react-icons/bs";
import styled from "styled-components";
import useOutsideClick from "../../utils/function/clickOutside";
import { colors } from "../../colors";
import { data } from "../../utils/data";
import SimpleFilterItem from "./simpleFilterItem";
import ComplexeFilterItem from "./complexeFilterItem";
import { getResult } from "../../utils/api/RechercheApi";
import { computeQuery } from "../../utils/function/function";
import { useHistory } from "react-router-dom";
import { loadResultInfo } from "../../actions/ressources/ressourcesActions";
import {
  loadTypeFilter,
  loadKeywordsFilter,
  loadFormatsFilter,
  loadCategoriesFilter,
  loadDateFilter,
  loadImpactsFilter,
  loadActionsFilter,
  resetAllFilter,
} from "../../actions/filter/filterActions";

const KeyWordsContainer = styled.div`
  display: flex;
  padding: 9px 5px;
  align-items: center;
  border-right: 0.5px solid ${colors.gris};
  padding-right: 15px;
  color: ${colors.gris};
  font-weight: 500;
  cursor: pointer;
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
  flex-wrap: wrap;
  margin: ${(props) =>
    props.page === "recherche"
      ? ""
      : props.showAdvancedSearch
      ? "-32px auto 70px auto"
      : "-32px auto 0px auto"};
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
  const [keywords, setKeywords] = useState(props.filters.keywords);
  const [selectedFormat, setSelectedFormat] = useState(props.filters.formats);
  const [showFormatOptions, setShowFormatOptions] = useState(false);
  const [selectedType, setSelectedType] = useState(props.filters.types);
  const [showTypeOptions, setShowTypeOptions] = useState(false);
  const [selectedCategorie, setSelectedCategorie] = useState(
    props.filters.categories
  );
  const [showCategorieOptions, setShowCategorieOptions] = useState(false);
  const [selectedDate, setSelectedDate] = useState(props.filters.date);
  const [showDateOptions, setShowDateOptions] = useState(false);
  const [selectedImpacts, setSelectedImpacts] = useState(props.filters.impacts);
  const [showImpactsOptions, setShowImpactsOptions] = useState(false);
  const [selectedActions, setSelectedActions] = useState(props.filters.actions);
  const [showActionsOptions, setShowActionsOptions] = useState(false);

  const actionsref = useRef();
  const impactsref = useRef();
  const dateRef = useRef();
  const formatRef = useRef();
  const typeRef = useRef();
  const categorieRef = useRef();

  let history = useHistory();

  useOutsideClick(actionsref, () => setShowActionsOptions(false));
  useOutsideClick(impactsref, () => setShowImpactsOptions(false));
  useOutsideClick(dateRef, () => setShowDateOptions(false));
  useOutsideClick(formatRef, () => setShowFormatOptions(false));
  useOutsideClick(typeRef, () => setShowTypeOptions(false));
  useOutsideClick(categorieRef, () => setShowCategorieOptions(false));
  useEffect(() => {
    let query = computeQuery(
      keywords,
      selectedType,
      selectedDate,
      selectedCategorie,
      selectedImpacts,
      selectedActions,
      selectedFormat
    );
    getResult(query).then((res) => props.loadResultInfo(res));
  }, []);

  useEffect(() => {
    props.setIsSearchOpen(
      showFormatOptions ||
        showTypeOptions ||
        showCategorieOptions ||
        showDateOptions ||
        showImpactsOptions ||
        showActionsOptions
    );
  }, [
    showFormatOptions,
    showTypeOptions,
    showCategorieOptions,
    showDateOptions,
    showImpactsOptions,
    showActionsOptions,
  ]);

  const handleChangeKeywords = (value) => {
    setKeywords(value);
    props.loadKeywordsFilter(value);
  };

  const handleChangeActions = (value) => {
    setSelectedActions(value);
    props.loadActionsFilter(value);
  };

  const handleChangeImpacts = (value) => {
    setSelectedImpacts(value);
    props.loadImpactsFilter(value);
  };

  const handleChangeFormats = (value) => {
    setSelectedFormat(value);
    props.loadFormatsFilter(value);
  };

  const handleChangeTypes = (value) => {
    setSelectedType(value);
    props.loadTypeFilter(value);
  };
  const handleChangeCategorie = (value) => {
    setSelectedCategorie(value);
    props.loadCategoriesFilter(value);
  };

  const toggleCategorieOptions = () => {
    setShowCategorieOptions(!showCategorieOptions);
    toggleOther("Categorie");
  };

  const toggleImpactsOptions = () => {
    setShowImpactsOptions(!showImpactsOptions);
    toggleOther("Impact");
  };

  const toggleActionsOptions = () => {
    setShowActionsOptions(!showActionsOptions);
    toggleOther("Actions");
  };

  const toggleDateOptions = () => {
    setShowDateOptions(!showDateOptions);
    toggleOther("Date");
  };

  const handleChangeDate = (item) => {
    setSelectedDate(item);
    setShowDateOptions(false);
    props.loadDateFilter(item);
  };

  const toggleTypeOptions = () => {
    setShowTypeOptions(!showTypeOptions);
    toggleOther("Type");
  };

  const toggleFormatOptions = () => {
    setShowFormatOptions(!showFormatOptions);
    toggleOther("Format");
  };

  const toggleAdvancedSearch = () => {
    setShowAdvancedSearch(!showAdvancedSearch);
  };

  const sendSearchRequest = () => {
    let query = computeQuery(
      keywords,
      selectedType,
      selectedDate,
      selectedCategorie,
      selectedImpacts,
      selectedActions,
      selectedFormat
    );
    getResult(query).then((res) => props.loadResultInfo(res));
  };
  const isHome =
    history.location.pathname === "/" || history.location.pathname === "/home";

  const toggleOther = (type) => {
    switch (type) {
      case "Categorie":
        setShowFormatOptions(false);
        setShowImpactsOptions(false);
        setShowActionsOptions(false);
        setShowTypeOptions(false);
        setShowDateOptions(false);
        break;
      case "Format":
        setShowCategorieOptions(false);
        setShowImpactsOptions(false);
        setShowTypeOptions(false);
        setShowDateOptions(false);
        setShowActionsOptions(false);
        break;
      case "Impact":
        setShowCategorieOptions(false);
        setShowFormatOptions(false);
        setShowTypeOptions(false);
        setShowDateOptions(false);
        setShowActionsOptions(false);
        break;
      case "Actions":
        setShowCategorieOptions(false);
        setShowFormatOptions(false);
        setShowTypeOptions(false);
        setShowDateOptions(false);
        setShowImpactsOptions(false);
        break;
      case "Type":
        setShowCategorieOptions(false);
        setShowFormatOptions(false);
        setShowActionsOptions(false);
        setShowDateOptions(false);
        setShowImpactsOptions(false);
        break;
      case "Date":
        setShowCategorieOptions(false);
        setShowFormatOptions(false);
        setShowActionsOptions(false);
        setShowTypeOptions(false);
        setShowImpactsOptions(false);
        break;
      default:
        break;
    }
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
    <MainContainer page={props.page} showAdvancedSearch={showAdvancedSearch}>
      <KeyWordsContainer>
        <GoSearch style={{ marginRight: "12px" }} />
        <input
          type="text"
          className="recherche_input"
          placeholder={"Rechercher une ressource par mots-cléfs..."}
          onChange={(e) => handleChangeKeywords(e.target.value)}
        />{" "}
      </KeyWordsContainer>

      <div ref={actionsref}>
        <ComplexeFilterItem
          selectedObject={selectedActions}
          setSelectedObject={handleChangeActions}
          toggleOptions={toggleActionsOptions}
          showOptions={showActionsOptions}
          title={"Domaine d'action"}
          data={props.taxonomie && props.taxonomie.domainesActions}
          default="Choisir"
        />
      </div>
      <div ref={impactsref}>
        <ComplexeFilterItem
          selectedObject={selectedImpacts}
          setSelectedObject={handleChangeImpacts}
          toggleOptions={toggleImpactsOptions}
          showOptions={showImpactsOptions}
          title={"Domaine d'impact"}
          data={props.taxonomie && props.taxonomie.domainesImpacts}
          default="Choisir"
        />
      </div>
      <div ref={typeRef}>
        <SimpleFilterItem
          selectedObject={selectedType}
          setSelectedObject={handleChangeTypes}
          toggleOptions={toggleTypeOptions}
          showOptions={showTypeOptions}
          title={"Type de ressource"}
          data={data.type_ressources}
          default="Dans tout le site"
        />
      </div>
      {isHome ? (
        <Link style={{ textDecoration: "none" }} to={"/recherche"}>
          <SearchButtonContainer onClick={sendSearchRequest}>
            rechercher
          </SearchButtonContainer>
        </Link>
      ) : (
        <SearchButtonContainer onClick={sendSearchRequest}>
          rechercher
        </SearchButtonContainer>
      )}
      <ToggleContainer onClick={toggleAdvancedSearch}>
        Recherche avancée
      </ToggleContainer>
      {showAdvancedSearch && (
        <AdvancedSearchBarContainer>
          <AdvancedSearchBar>
            {isArticleSelected && (
              <div ref={categorieRef}>
                <SimpleFilterItem
                  selectedObject={selectedCategorie}
                  setSelectedObject={handleChangeCategorie}
                  toggleOptions={toggleCategorieOptions}
                  showOptions={showCategorieOptions}
                  title={"Catégorie"}
                  data={categoriesData}
                  default="Toutes les catégories"
                />
              </div>
            )}
            <div ref={formatRef}>
              <SimpleFilterItem
                selectedObject={selectedFormat}
                setSelectedObject={handleChangeFormats}
                toggleOptions={toggleFormatOptions}
                showOptions={showFormatOptions}
                title={"Format"}
                data={data.format_ressources}
                default="Tous les formats"
              />
            </div>
            <div ref={dateRef}>
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
            </div>
          </AdvancedSearchBar>
        </AdvancedSearchBarContainer>
      )}
    </MainContainer>
  );
};

const mapDispatchToProps = {
  loadResultInfo,
  loadTypeFilter,
  loadKeywordsFilter,
  loadFormatsFilter,
  loadCategoriesFilter,
  loadDateFilter,
  loadImpactsFilter,
  loadActionsFilter,
  resetAllFilter,
};

const mapStateToProps = (store) => {
  return {
    taxonomie: store.taxonomie,
    ressources: store.ressources,
    filters: store.filters,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
