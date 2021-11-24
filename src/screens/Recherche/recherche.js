import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import SearchBar from "../../components/Recherche/searchBar";
import styled from "styled-components";
import { colors } from "../../colors";
import DOMPurify from "dompurify";
import { config } from "../../config";
import useMediaQuery from "@mui/material/useMediaQuery";
import GridResultComponent from "../../components/Resultats/gridResultComponent";
import ListResultComponent from "../../components/Resultats/listResultComponent";
import { loadResultInfo } from "../../actions/ressources/ressourcesActions";
const MainContainer = styled.div`
  min-height: 100vh;
`;

const HeaderContainer = styled.header`
  padding: ${(props) => (props.isMobile ? "30px" : "80px 0 140px 10%")};
  text-align: left;
  background-image: url(${config.header_image_url});
  background-size: cover;
  background-position: bottom right;
`;

const HeaderTitleContainer = styled.h2`
  font-size: 45px;
  color: ${colors.marine};
  line-height: 58px;
  letter-spacing: 0em;
  text-transform: uppercase;
  margin: 0;
`;

const SubtitleContainer = styled.p`
  margin-top: 26px;
  color: ${colors.gris};
  max-width: ${(props) => (props.isMobile ? "" : "80%")};
`;
const BodyContainer = styled.div`
  padding: ${(props) => (props.isViewGrid ? "" : "0 35px")};
  display: flex;
  flex-direction: ${(props) => (props.isViewGrid ? "row" : "column")};
  justify-content: center;
  flex-wrap: wrap;
`;

const NumberResultsContainer = styled.div`
  color: ${colors.marine};
  font-weight: 600;
  font-size: 52px;
  text-transform: uppercase;
  display: flex;
  align-items: baseline;
`;

const MiddleContainer = styled.div`
  padding: 40px;
  display: flex;
  justify-content: space-between;
`;

const ButtonViewContainer = styled.div`
  padding: 4px;
  display: flex;
  box-shadow: inset 0px 4px 8px rgba(0, 0, 0, 0.16);
`;
const ButtonView = styled.div`
  display: flex;
  cursor: pointer;
  padding: 10px 15px;
  box-shadow: 0px 2px 4px rgba(0, 57, 86, 0.43);
  background-color: ${(props) => (props.isSelected ? colors.marine : "white")};
  color: ${(props) => (!props.isSelected ? colors.marine : "white")};
  font-weight: 600;
  font-size: 12px;
  text-transform: uppercase;
  align-items: center;
  &:hover {
    box-shadow: 12px 16px 35px 0px rgba(0, 0, 0, 0.3);
    transition: box-shadow 150ms linear, background-color 150ms linear,
      transform 150ms linear;
    transform: scale(0.98);
  }
`;
const TriesContainer = styled.div`
  display: flex;
  justify-content: ${(props) => (props.isMobile ? "center" : "flex-end")};
  padding: 0 40px;
  margin-bottom: 13px;
`;
const HeaderSubTitleContainer = styled.h3`
  font-size: 45px;
  color: ${colors.marine};
  line-height: 58px;
  letter-spacing: 0em;
  text-transform: uppercase;
  font-weight: 300;
  margin: 0;
`;
const Tries = styled.div`
  font-weight: bold;
  font-size: 12px;
  display: flex;
  align-items: center;
  text-transform: uppercase;
  color: ${(props) => (props.isTrue ? "black" : colors.gris)};
  margin: auto 5px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
    transition: opacity 150ms linear, transform 150ms linear;
    transform: scale(0.98);
  }
`;

const NoRequestContainer = styled.div`
  font-weight: bold;
  font-size: 14px;
  display: flex;
  align-items: center;
  text-transform: uppercase;
  cursor: pointer;
  color: ${colors.gris};
`;

const Recherche = (props) => {
  const [isFilterSeledted, setIsFilterSelected] = useState(false);
  const [isViewGrid, setIsViewGrid] = useState(true);
  const [viewTrie, setViewTrie] = useState(false);
  const [updateTrie, setUpdateTrie] = useState(true);
  const [pertinenceTrie, setPertinenceTrie] = useState(false);
  const [resultToDisplay, setResultToDisplay] = useState(
    props.ressources.results
  );
  const isMobile = useMediaQuery(`(max-width:${config.breakPoint})`);

  useEffect(() => {
    setResultToDisplay(props.ressources.results);
  }, [props.ressources.results]);

  useEffect(() => {
    addQueryUrl();
  }, []);
  const slug = props.slug || "recherche";
  const template = props.pages.templates.length
    ? props.pages.templates.filter((template) => template.slug === slug)[0]
    : null;

  const addQueryUrl = () => {
    let string = "?s=" + props.filters.keywords;
    if (string !== window.location.search && props.filters.keywords !== "") {
      props.history.push({
        search: "?s=" + props.filters.keywords,
      });
    }
  };

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleIsSearchOpen = (isOpen) => {
    setIsSearchOpen(isOpen);
  };

  const toggleViewTrie = () => {
    setViewTrie(!viewTrie);
    trieViewResult(resultToDisplay);
  };

  const toggleUpdateTrie = () => {
    setUpdateTrie(!updateTrie);
    trieDateResult(resultToDisplay);
  };
  const togglepertinenceTrie = () => {
    setPertinenceTrie(!pertinenceTrie);
    triePertinenceResult(resultToDisplay);
  };
  const trieViewResult = (resultArray) => {
    let newArray = [];
    resultArray.forEach((item) => newArray.push(item));
    if (viewTrie) {
      newArray.sort((a, b) => (a.datas.vues - b.datas.vues > 0 ? 1 : -1));
    }
    if (!viewTrie) {
      newArray.sort((a, b) => (b.datas.vues - a.datas.vues < 0 ? -1 : 1));
    }
    setResultToDisplay(newArray);
  };
  const triePertinenceResult = (resultArray) => {
    let newArray = [];
    resultArray.forEach((item) => newArray.push(item));
    if (pertinenceTrie) {
      newArray.sort((a, b) => (a.pertinence - b.pertinence > 0 ? 1 : -1));
    }
    if (!pertinenceTrie) {
      newArray.sort((a, b) => (b.pertinence - a.pertinence > 0 ? -1 : 1));
    }
    setResultToDisplay(newArray);
  };
  const trieDateResult = (resultArray) => {
    let newArray = [];
    resultArray.forEach((item) => newArray.push(item));
    if (updateTrie) {
      newArray.sort((a, b) =>
        new Date(a.date_modified) - new Date(b.date_modified) > 0 ? 1 : -1
      );
    }
    if (!updateTrie) {
      newArray.sort((a, b) =>
        new Date(a.date_modified) - new Date(b.date_modified) > 0 ? -1 : 1
      );
    }
    setResultToDisplay(newArray);
  };
  return (
    <MainContainer>
      <HeaderContainer isMobile={isMobile}>
        {template && template.title ? (
          <HeaderTitleContainer
            style={{ fontWeight: "700" }}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(template.title.rendered),
            }}
          />
        ) : (
          <HeaderTitleContainer style={{ fontWeight: "700" }}>
            RECHERCHER UNE RESSOURCE
          </HeaderTitleContainer>
        )}
        <HeaderSubTitleContainer>
          {" "}
          {template ? template.acf.sous_titre : ""}
        </HeaderSubTitleContainer>
        {template && template.acf.intro && (
          <SubtitleContainer
            isMobile={isMobile}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(template.acf.intro),
            }}
          />
        )}

        <SearchBar
          page="recherche"
          setIsFilterSelected={setIsFilterSelected}
          setIsSearchOpen={toggleIsSearchOpen}
          addQueryUrl={addQueryUrl}
        />
      </HeaderContainer>
      <MiddleContainer>
        {isFilterSeledted ? (
          <NumberResultsContainer>
            {resultToDisplay.length}{" "}
            <div style={{ fontSize: "28px", marginLeft: "5px" }}>
              {" "}
              {resultToDisplay.length > 1 ? "Résultats" : "Résultat"}
            </div>
          </NumberResultsContainer>
        ) : (
          <NoRequestContainer>
            Les dernières ressources mises à jour
          </NoRequestContainer>
        )}

        <ButtonViewContainer>
          <ButtonView
            isSelected={isViewGrid}
            onClick={() => setIsViewGrid(true)}
          >
            <i
              className="bi bi-grid-3x2-gap"
              style={{ fontSize: "25px", marginRight: "5px" }}
            ></i>
            {!isMobile && "Vue grille"}
          </ButtonView>
          <ButtonView
            onClick={() => setIsViewGrid(false)}
            isSelected={!isViewGrid}
          >
            <i
              className="bi bi-list-ul"
              style={{ fontSize: "25px", marginRight: "5px" }}
            ></i>
            {!isMobile && "Vue liste"}
          </ButtonView>
        </ButtonViewContainer>
      </MiddleContainer>
      <TriesContainer isMobile={isMobile}>
        <Tries onClick={toggleViewTrie} isTrue={viewTrie}>
          nombre de vues{" "}
          {viewTrie ? (
            <i className="bi bi-arrow-up" style={{ marginLeft: "5px" }}></i>
          ) : (
            <i className="bi bi-arrow-down" style={{ marginLeft: "5px" }}></i>
          )}
        </Tries>
        <Tries onClick={toggleUpdateTrie} isTrue={updateTrie}>
          dernière mise à jour{" "}
          {updateTrie ? (
            <i className="bi bi-arrow-up" style={{ marginLeft: "5px" }}></i>
          ) : (
            <i className="bi bi-arrow-down" style={{ marginLeft: "5px" }}></i>
          )}
        </Tries>
        <Tries onClick={togglepertinenceTrie} isTrue={pertinenceTrie}>
          pertinence{" "}
          {pertinenceTrie ? (
            <i className="bi bi-arrow-up" style={{ marginLeft: "5px" }}></i>
          ) : (
            <i className="bi bi-arrow-down" style={{ marginLeft: "5px" }}></i>
          )}
        </Tries>
      </TriesContainer>
      <BodyContainer isViewGrid={isViewGrid}>
        {resultToDisplay &&
          resultToDisplay.map((item, index) => {
            if (
              item.type === "indicateurs" ||
              item.type === "documents" ||
              item.type === "post"
            ) {
              let info = { ID: item.id, post_type: item.type };
              return isViewGrid ? (
                <GridResultComponent key={index} info={info} />
              ) : (
                <ListResultComponent key={index} info={info} />
              );
            }
          })}
      </BodyContainer>
    </MainContainer>
  );
};

const mapDispatchToProps = { loadResultInfo };

const mapStateToProps = (store) => {
  return {
    pages: store.pages,
    ressources: store.ressources,
    filters: store.filters,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Recherche);
