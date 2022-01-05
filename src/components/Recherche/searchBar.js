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
import useMediaQuery from "@mui/material/useMediaQuery";
import { config } from "../../config";
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
  background-color: ${(props) => (props.isMobile ? "white" : "")};
  display: flex;
  padding: 0px 1%;
  align-items: center;
  box-shadow: ${(props) =>
    props.isMobile ? "0px 26px 70px rgba(0, 0, 0, 0.15)" : ""};
  border-right: ${(props) => (props.isMobile ? "" : "1px solid #E2E3E5")};
  color: ${colors.gris};
  font-weight: 500;
  margin: ${(props) => (props.isMobile ? "5px auto" : "")};
  cursor: pointer;
`;
const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${(props) => (props.isTop ? "5px 10px" : "5px 18px")};
  line-height: 20px;
  border-right: ${(props) => (props.isMobile ? "" : "1px solid #E2E3E5")};
  margin: ${(props) => (props.isMobile ? "5px auto" : "")};
  background-color: ${(props) => (props.isMobile ? "white" : "")};
  position: relative;
  @media screen and (max-width: 1024px) {
    padding: 5px 5%;
  }
`;
const FilterTitle = styled.div`
  font-weight: 700;
  font-size: ${(props) => (props.isTop ? "1.2rem" : "1.2rem")};
  color: ${colors.gris};
  text-transform: uppercase;
  @media screen and (max-width: 1024px) {
    font-size: 1rem;
  }
`;
const FilterContent = styled.div`
  font-weight: 500;
  font-size: ${(props) => (props.isTop ? "1.6rem" : "1.6rem")};
  color: ${colors.marine};
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: -webkit-fill-available;
  cursor: pointer;
  transition: opacity 150ms linear, transform 150ms linear;
  &:hover {
    opacity: 0.8;
    transform: scale(0.98);
  }
  @media screen and (max-width: 1024px) {
    font-size: 1.4rem;
  }
`;
const MainContainer = styled.div`
  display: flex;
  margin: auto;
  flex-direction: ${(props) => (props.isMobile ? "column" : "row")};
  box-shadow: ${(props) =>
    !props.isMobile ? "0px 26px 70px rgba(0, 0, 0, 0.15)" : ""};
  padding: 7px;
  flex-wrap: wrap;
  margin: ${(props) =>
    props.page === "recherche" && props.isTop
      ? "auto auto auto -90px"
      : props.page === "recherche"
      ? ""
      : props.showAdvancedSearch
      ? "-35px auto 70px auto"
      : "-35px auto 0px auto"};
  background-color: ${(props) => (props.isMobile ? "" : "white")};
  align-items: center;
  max-width: ${(props) => (props.isTop ? "75%" : "")};
  z-index: 1;
  position: ${(props) => (props.isTop ? "" : "relative")};
  & > div {
    flex: 1;
  }
  & > div:first-of-type {
    flex: 2;
  }
  &.sticky {
    position: fixed;
    top: 0px;
    right: 0;
    width: calc(100% - 266px);
    max-width: 100%;
    border: 10px solid #f7f9fa;
    border-width: 10px 4%;
  }
  @media screen and (max-width: 1280px) {
    & > div:first-of-type {
      flex: 100%;
      padding: 7px 0;
    }
    & > div {
      flex: 33%;
      margin-bottom: 10px;
    }
  }
  @media screen and (max-width: 1024px) {
    padding: 0;
    & > div:first-of-type {
      width: 100%;
      padding: 7px 10px;
    }
  }
`;

const SearchButtonContainer = styled.div`
  padding: ${(props) => (props.isTop ? "16px 10px" : "20px 30px")};
  color: white;
  background-color: ${colors.rouge};
  font-weight: 700;
  flex: auto 0 0 !important;
  text-transform: uppercase;
  font-size: 1.4rem;
  cursor: pointer;
  margin: ${(props) => (props.isMobile ? "5px auto" : "")};
  width: ${(props) => (props.isMobile ? "-webkit-fill-available" : "")};
  font-size: ${(props) => (props.isTop ? "1.2rem" : "")};
  text-align: center;
  transition: all 0.3s;
  &:hover {
    box-shadow: 2px 6px 15px 0px rgba(0, 0, 0, 0.3);
    transform: scale(0.98);
  }
`;
const AdvancedSearchBar = styled.div`
  display: flex;
  box-shadow: 0px 26px 70px rgba(0, 0, 0, 0.15);
  padding: 7px;
  margin: 10px auto 0px auto;
  background-color: white;
  width: fit-content;
  @media screen and (max-width: 1024px) {
    padding: 0;
  }
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
  bottom: -32px;
  right: 0;
  color: ${colors.rouge};
  text-transform: uppercase;
  font-weight: 600;
  font-size: 1.3rem;
  margin: 10px 5px 0px auto;
  cursor: pointer;
  transition: opacity 150ms linear, transform 150ms linear;
  &:hover {
    opacity: 0.8;
    transform: scale(0.98);
  }
`;
const FilterOptionsContainer = styled.div`
  font-size: 1.6rem;
  line-height: 21px;
  position: absolute;
  top: 60px;
  left: 0px;
  box-shadow: 0px 26px 70px rgba(0, 0, 0, 0.15);
  z-index: 1;
  display: flex;
  flex-direction: column;
  width: max-content;
  @media screen and (max-width: 1024px) {
    padding: 1.4rem;
  }
`;
const FilterOptions = styled.div`
  background-color: ${(props) => (props.isSelected ? colors.marine : "white")};
  color: ${(props) => (props.isSelected ? "white" : colors.gris)};
  display: flex;
  justify-content: space-between;
  padding: 15px 20px;
  flex-wrap: no-wrap;
`;
const categorieAll = {
  id: 0,
  name: "Toutes les catégories",
  taxonomy: "categorie",
};

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
  const [focused, setFocused] = useState(false);
  const [isTop, setIsTop] = useState(false);
  const actionsref = useRef();
  const impactsref = useRef();
  const dateRef = useRef();
  const formatRef = useRef();
  const typeRef = useRef();
  const categorieRef = useRef();

  let history = useHistory();
  const isMobile = useMediaQuery(`(max-width:${config.breakPoint})`);

  useOutsideClick(actionsref, () => setShowActionsOptions(false));
  useOutsideClick(impactsref, () => setShowImpactsOptions(false));
  useOutsideClick(dateRef, () => setShowDateOptions(false));
  useOutsideClick(formatRef, () => setShowFormatOptions(false));
  useOutsideClick(typeRef, () => setShowTypeOptions(false));
  useOutsideClick(categorieRef, () => setShowCategorieOptions(false));

  useEffect(() => {
    window.addEventListener("keyup", handleSearch);
    setIsSelectedFitler();
    return () => {
      window.removeEventListener("keyup", handleSearch);
    };
  }, [props.filters]);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      document.addEventListener("scroll", handleScroll);
      window.addEventListener("keyup", handleSearch);
      let query = computeQuery(
        keywords,
        selectedType,
        selectedDate,
        selectedCategorie,
        selectedImpacts,
        selectedActions,
        selectedFormat
      );
      getResult(query, 0).then((res) => props.loadResultInfo(res));
    }
    setIsSelectedFitler();
    return () => {
      document.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keyup", handleSearch);
      mounted = false;
    };
  }, [isMobile]);

  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  const setIsSelectedFitler = () => {
    if (
      keywords !== "" ||
      selectedFormat.length ||
      selectedType.length ||
      selectedCategorie.length ||
      selectedImpacts.length ||
      selectedActions.length ||
      (selectedDate && selectedDate.id && selectedDate.id !== 0)
    ) {
      props.setIsFilterSelected(true);
    } else {
      props.setIsFilterSelected(false);
    }
  };

  const handleScroll = (event) => {
    if (!isMobile) {
      var searchbar = document.getElementById("el");
      if (searchbar && !isHome) {
        var sticky = searchbar.offsetTop;
        if (window.pageYOffset > sticky) {
          setIsTop(true);
          searchbar.classList.add("sticky");
        } else if (window.pageYOffset < 250) {
          setIsTop(false);
          searchbar.classList.remove("sticky");
        }
      }
    }
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      props.setIsSearchOpen(
        showFormatOptions ||
          showTypeOptions ||
          showCategorieOptions ||
          showDateOptions ||
          showImpactsOptions ||
          showActionsOptions
      );
    }
    return function cleanup() {
      mounted = false;
    };
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
    if (props.setTrie) {
      props.setTrie("date");
    }
    setIsSelectedFitler();
    let query = computeQuery(
      props.filters.keywords,
      props.filters.types,
      props.filters.date,
      props.filters.categories,
      props.filters.impacts,
      props.filters.actions,
      props.filters.formats
    );
    getResult(query, 0).then((res) => props.loadResultInfo(res));
    if (props.addQueryUrl) {
      props.addQueryUrl();
    }
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
    props.taxonomie.categories && props.taxonomie.categories.length > 0
      ? props.taxonomie.categories.forEach((item) => array.push(item))
      : array.push();
    array.unshift(categorieAll);
    return array;
  };
  const categoriesData = categoriesOptions();
  const handleSearch = (e) => {
    if (e && e.code === "Enter") {
      sendSearchRequest();
    }
  };
  const isDocSelected =
    selectedType.filter((item) => item.id === 1).length > 0 ||
    selectedType.length === 0;

  const isArticleSelected =
    selectedType.filter((item) => item.id === 3).length > 0 ||
    selectedType.length === 0;
  console.log(props.page);
  return (
    <MainContainer
      id="el"
      page={props.page}
      onKeyPress={(e) => e.key === "Enter" && handleSearch()}
      isTop={isTop}
      isMobile={isMobile}
      showAdvancedSearch={showAdvancedSearch}
    >
      <KeyWordsContainer isMobile={isMobile} isTop={isTop}>
        <GoSearch
          style={{ marginRight: isTop ? "5px" : "17px", fontSize: "2.4rem" }}
        />
        <input
          onFocus={onFocus}
          onBlur={onBlur}
          type="text"
          value={keywords}
          className={isMobile ? "recherche_input_mobile" : "recherche_input"}
          placeholder={"Rechercher une ressource par mots-cléfs..."}
          onChange={(e) => handleChangeKeywords(e.target.value)}
        />{" "}
      </KeyWordsContainer>
      {(props.page !== "home" || !isMobile) && (
        <>
          <div
            style={isMobile ? { width: "-webkit-fill-available" } : {}}
            ref={actionsref}
          >
            <ComplexeFilterItem
              isTop={isTop}
              selectedObject={selectedActions}
              setSelectedObject={handleChangeActions}
              toggleOptions={toggleActionsOptions}
              showOptions={showActionsOptions}
              title={"Domaine d'action"}
              data={props.taxonomie && props.taxonomie.domainesActions}
              default="Choisir"
            />
          </div>
          <div
            style={isMobile ? { width: "-webkit-fill-available" } : {}}
            ref={impactsref}
          >
            <ComplexeFilterItem
              isTop={isTop}
              selectedObject={selectedImpacts}
              setSelectedObject={handleChangeImpacts}
              toggleOptions={toggleImpactsOptions}
              showOptions={showImpactsOptions}
              title={"Domaine d'impact"}
              data={props.taxonomie && props.taxonomie.domainesImpacts}
              default="Choisir"
            />
          </div>
          <div
            style={isMobile ? { width: "-webkit-fill-available" } : {}}
            ref={typeRef}
          >
            <SimpleFilterItem
              isTop={isTop}
              isType={true}
              selectedObject={selectedType}
              setSelectedObject={handleChangeTypes}
              toggleOptions={toggleTypeOptions}
              showOptions={showTypeOptions}
              title={"Type de ressource"}
              data={data.type_ressources}
              default="Dans tout le site"
            />
          </div>
        </>
      )}
      {(isTop || (isMobile && showAdvancedSearch)) && (
        <>
          {isArticleSelected && (
            <div
              style={isMobile ? { width: "-webkit-fill-available" } : {}}
              ref={categorieRef}
            >
              <SimpleFilterItem
                isTop={isTop}
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
          {isDocSelected && (
            <div
              style={isMobile ? { width: "-webkit-fill-available" } : {}}
              ref={formatRef}
            >
              <SimpleFilterItem
                isTop={isTop}
                selectedObject={selectedFormat}
                setSelectedObject={handleChangeFormats}
                toggleOptions={toggleFormatOptions}
                showOptions={showFormatOptions}
                title={"Format"}
                data={data.format_ressources}
                default="Tous les formats"
              />
            </div>
          )}
          {props.page === "home" && isMobile && (
            <>
              <div
                style={isMobile ? { width: "-webkit-fill-available" } : {}}
                ref={actionsref}
              >
                <ComplexeFilterItem
                  isTop={isTop}
                  selectedObject={selectedActions}
                  setSelectedObject={handleChangeActions}
                  toggleOptions={toggleActionsOptions}
                  showOptions={showActionsOptions}
                  title={"Domaine d'action"}
                  data={props.taxonomie && props.taxonomie.domainesActions}
                  default="Choisir"
                />
              </div>
              <div
                style={isMobile ? { width: "-webkit-fill-available" } : {}}
                ref={impactsref}
              >
                <ComplexeFilterItem
                  isTop={isTop}
                  selectedObject={selectedImpacts}
                  setSelectedObject={handleChangeImpacts}
                  toggleOptions={toggleImpactsOptions}
                  showOptions={showImpactsOptions}
                  title={"Domaine d'impact"}
                  data={props.taxonomie && props.taxonomie.domainesImpacts}
                  default="Choisir"
                />
              </div>
              <div
                style={isMobile ? { width: "-webkit-fill-available" } : {}}
                ref={typeRef}
              >
                <SimpleFilterItem
                  isTop={isTop}
                  isType={true}
                  selectedObject={selectedType}
                  setSelectedObject={handleChangeTypes}
                  toggleOptions={toggleTypeOptions}
                  showOptions={showTypeOptions}
                  title={"Type de ressource"}
                  data={data.type_ressources}
                  default="Dans tout le site"
                />
              </div>
            </>
          )}
          <div
            style={isMobile ? { width: "-webkit-fill-available" } : {}}
            ref={dateRef}
          >
            <FilterContainer
              isMobile={isMobile}
              isTop={isTop}
              style={{ border: "none" }}
            >
              <FilterTitle isTop={isTop}>Date</FilterTitle>
              <FilterContent isTop={isTop} onClick={toggleDateOptions}>
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
                        data-name={item.taxonomy}
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
        </>
      )}
      {isHome ? (
        <Link to={"/recherche"}>
          <SearchButtonContainer isTop={isTop} isMobile={isMobile}>
            rechercher
          </SearchButtonContainer>
        </Link>
      ) : (
        <SearchButtonContainer
          isMobile={isMobile}
          isTop={isTop}
          onClick={sendSearchRequest}
        >
          rechercher
        </SearchButtonContainer>
      )}
      {!isTop && (
        <ToggleContainer onClick={toggleAdvancedSearch}>
          Recherche avancée
        </ToggleContainer>
      )}
      {showAdvancedSearch && !isTop && !isMobile && (
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
            {isDocSelected && (
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
            )}
            <div ref={dateRef}>
              <FilterContainer style={{ border: "none" }}>
                <FilterTitle>Date</FilterTitle>
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
                          data-name={item.taxonomy}
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
