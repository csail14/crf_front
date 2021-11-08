import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import SearchBar from "../../components/Recherche/searchBar";
import styled from "styled-components";
import { colors } from "../../colors";
import DOMPurify from "dompurify";
import { config } from "../../config";
import { isMobile } from "react-device-detect";
import GridResultComponent from "../../components/Resultats/gridResultComponent";
import ListResultComponent from "../../components/Resultats/listResultComponent";
import { checkAllRessources } from "../../utils/function/function";
import {
  loadRessourcesInfo,
  loadResultInfo,
} from "../../actions/ressources/ressourcesActions";
const MainContainer = styled.div`
  min-height: 100vh;
`;

const HeaderContainer = styled.div`
  padding: ${isMobile ? "30px" : "80px 0 140px 100px"};
  text-align: left;
  background-image: url(${config.header_image_url});
  background-size: cover;
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
  color: ${colors.gris};
  max-width: 80%;
`;
const BodyContainer = styled.div`
  padding: ${(props) => (props.isViewGrid ? "" : "0 35px")};
  display: flex;
  flex-direction: ${(props) => (props.isViewGrid ? "row" : "column")};
  justify-content: center;
  flex-wrap: ${isMobile ? "wrap" : ""};
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
`;
const TriesContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 40px;
  margin-bottom: 13px;
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
  const [isViewGrid, setIsViewGrid] = useState(true);
  const [viewTrie, setViewTrie] = useState(false);
  const [updateTrie, setUpdateTrie] = useState(true);
  const [pertinenceTrie, setPertinenceTrie] = useState(false);
  const [resultToDisplay, setResultToDisplay] = useState([]);

  useEffect(() => {
    checkAllRessources(
      props.ressources.allRessources,
      props.loadRessourcesInfo
    );
  }, []);

  useEffect(() => {
    props.loadResultInfo(props.ressources.allRessources);
  }, [props.ressources.allRessources]);

  useEffect(() => {
    setResultToDisplay(props.ressources.results);
  }, [props.ressources.results]);

  const template = props.pages.templates.length
    ? props.pages.templates.filter(
        (template) => template.slug === "recherche"
      )[0]
    : null;

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleIsSearchOpen = (isOpen) => {
    setIsSearchOpen(isOpen);
  };

  const toggleViewTrie = () => {
    setViewTrie(!viewTrie);
  };

  const toggleUpdateTrie = () => {
    setUpdateTrie(!updateTrie);
  };
  const togglepertinenceTrie = () => {
    setPertinenceTrie(!pertinenceTrie);
  };

  const trieResult = (resultArray) => {
    let newArray = [];
    resultArray.forEach((item) => newArray.push(item));
    if (viewTrie) {
      newArray.sort((a, b) => (a.modified - b.modified ? 1 : -1));
    }
  };

  return (
    <MainContainer>
      <HeaderContainer>
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
        {template && template.acf.intro && (
          <SubtitleContainer
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(template.acf.intro),
            }}
          />
        )}
        {!isMobile && (
          <SearchBar page="recherche" setIsSearchOpen={toggleIsSearchOpen} />
        )}
      </HeaderContainer>
      <MiddleContainer>
        <NumberResultsContainer>
          {resultToDisplay.length}{" "}
          <div style={{ fontSize: "28px", marginLeft: "5px" }}> Résultats</div>
        </NumberResultsContainer>
        <NoRequestContainer>
          Les dernières ressources mises à jour
        </NoRequestContainer>
        <ButtonViewContainer>
          <ButtonView
            isSelected={isViewGrid}
            onClick={() => setIsViewGrid(true)}
          >
            <i
              class="bi bi-grid-3x2-gap"
              style={{ fontSize: "25px", marginRight: "5px" }}
            ></i>
            Vue grille
          </ButtonView>
          <ButtonView
            onClick={() => setIsViewGrid(false)}
            isSelected={!isViewGrid}
          >
            <i
              class="bi bi-list-ul"
              style={{ fontSize: "25px", marginRight: "5px" }}
            ></i>
            Vue liste
          </ButtonView>
        </ButtonViewContainer>
      </MiddleContainer>
      <TriesContainer>
        <Tries onClick={toggleViewTrie} isTrue={viewTrie}>
          nombre de vues{" "}
          {viewTrie ? (
            <i class="bi bi-arrow-up" style={{ marginLeft: "5px" }}></i>
          ) : (
            <i class="bi bi-arrow-down" style={{ marginLeft: "5px" }}></i>
          )}
        </Tries>
        <Tries onClick={toggleUpdateTrie} isTrue={updateTrie}>
          dernière mise à jour{" "}
          {updateTrie ? (
            <i class="bi bi-arrow-up" style={{ marginLeft: "5px" }}></i>
          ) : (
            <i class="bi bi-arrow-down" style={{ marginLeft: "5px" }}></i>
          )}
        </Tries>
        <Tries onClick={togglepertinenceTrie} isTrue={pertinenceTrie}>
          pertinence{" "}
          {pertinenceTrie ? (
            <i class="bi bi-arrow-up" style={{ marginLeft: "5px" }}></i>
          ) : (
            <i class="bi bi-arrow-down" style={{ marginLeft: "5px" }}></i>
          )}
        </Tries>
      </TriesContainer>
      <BodyContainer isViewGrid={isViewGrid}>
        {resultToDisplay &&
          resultToDisplay.map((item) => {
            if (
              item.subtype === "indicateurs" ||
              item.subtype === "documents" ||
              item.subtype === "post"
            ) {
              let info = { ID: item.id, post_type: item.subtype };
              return isViewGrid ? (
                <GridResultComponent info={info} />
              ) : (
                <ListResultComponent info={info} />
              );
            }
          })}
      </BodyContainer>
    </MainContainer>
  );
};

const mapDispatchToProps = { loadRessourcesInfo, loadResultInfo };

const mapStateToProps = (store) => {
  return {
    pages: store.pages,
    ressources: store.ressources,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Recherche);
