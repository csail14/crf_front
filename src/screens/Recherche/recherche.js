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
import { useHistory } from "react-router-dom";
import header from "../../assets/header.jpeg";

const MainContainer = styled.div`
  min-height: 100vh;
`;

const HeaderContainer = styled.header`
  padding: ${(props) => (props.isMobile ? "30px" : "121px 9% 58px")};
  background-image: url(${header});
  background-size: cover;
  background-position: bottom right;
`;

const HeaderTitleContainer = styled.h1`
  font-size: 4.5rem;
  color: ${colors.marine};
  line-height: 50px;
  letter-spacing: 0.07rem;
  text-transform: uppercase;
  margin: 0;
  font-weight: 700;
`;
const HeaderSubTitleContainer = styled.h2`
  font-size: 4.5rem;
  color: ${colors.marine};
  line-height: 42px;
  letter-spacing: 0.01em;
  text-transform: uppercase;
  margin: 0 0 34px;
  font-weight: 300;
`;

const SubtitleContainer = styled.div`
  margin-top: 26px;
  color: ${colors.gris};
  max-width: 800px;
  line-height: 1.8;
`;
const BodyContainer = styled.div`
  padding: 0 4%;
  display: flex;
  flex-direction: ${(props) => (props.isViewGrid ? "row" : "column")};
  flex-wrap: wrap;
`;

const NumberResultsContainer = styled.div`
  color: ${colors.marine};
  font-weight: 600;
  font-size: 5.2rem;
  text-transform: uppercase;
  display: flex;
  align-items: baseline;
`;

const MiddleContainer = styled.div`
  padding: 40px 4%;
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
  background-color: ${(props) =>
    props.isSelected ? colors.marine : "transparent"};
  color: ${(props) => (!props.isSelected ? colors.marine : "white")};
  font-weight: 600;
  font-size: 1.2rem;
  text-transform: uppercase;
  align-items: center;
  transition: box-shadow 150ms linear, background-color 150ms linear,
    transform 150ms linear;
  &:hover {
    box-shadow: 12px 16px 35px 0px rgba(0, 0, 0, 0.3);
    transform: scale(0.98);
  }
`;
const TriesContainer = styled.div`
  display: flex;
  justify-content: ${(props) => (props.isMobile ? "center" : "flex-end")};
  padding: 0 4%;
  margin-bottom: 13px;
`;

const Tries = styled.div`
  font-weight: bold;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  text-transform: uppercase;
  color: ${(props) => (props.isTrue ? "black" : colors.gris)};
  margin: auto 5px;
  cursor: pointer;
  transition: opacity 150ms linear, transform 150ms linear;
  &:hover {
    opacity: 0.8;
    transform: scale(0.98);
  }
`;

const NoRequestContainer = styled.div`
  font-weight: bold;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  text-transform: uppercase;
  cursor: pointer;
  color: ${colors.gris};
`;

const Recherche = (props) => {
  const [isFilterSeledted, setIsFilterSelected] = useState(false);
  const [isViewGrid, setIsViewGrid] = useState(true);

  const [query, setQuery] = useState("");
  const [resultToDisplay, setResultToDisplay] = useState(
    props.ressources.results
  );
  const [trie, setTrie] = useState(null);
  const [trieDirection, setTrieDirection] = useState(false);
  const isMobile = useMediaQuery(`(max-width:${config.breakPoint})`);

  useEffect(() => {
    setResultToDisplay(props.ressources.results);
  }, [props.ressources.results]);

  useEffect(() => {
    addQueryUrl();
  }, []);

  useEffect(() => {
    if (trie !== null) {
      trieResult(resultToDisplay);
      trieResult(resultToDisplay);
    }
  }, [trie, trieDirection]);

  const slug = props.slug || "recherche";
  const template = props.pages.templates.length
    ? props.pages.templates.filter((template) => template.slug === slug)[0]
    : null;

  const addQueryUrl = () => {
    let string = "?s=" + props.filters.keywords;

    if (
      string !== window.location.search &&
      query !== window.location.search &&
      props.filters.keywords !== ""
    ) {
      setQuery(window.location.search);
      history.push({
        search: "?s=" + props.filters.keywords,
      });
    } else {
    }
  };

  let history = useHistory();

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleIsSearchOpen = (isOpen) => {
    setIsSearchOpen(isOpen);
  };

  const activeTrie = (trie) => {
    setTrie(trie);
    setTrieDirection(!trieDirection);
  };

  const trieResult = (resultArray) => {
    switch (trie) {
      case "vues":
        if (trieDirection) {
          resultArray.sort(function (a, b) {
            return a.datas.vues - b.datas.vues;
          });
        } else {
          resultArray.sort(function (a, b) {
            return b.datas.vues - a.datas.vues;
          });
        }

        break;
      case "date":
        if (trieDirection) {
          resultArray.sort((a, b) =>
            new Date(a.date_modified) - new Date(b.date_modified) > 0 ? 1 : -1
          );
        } else {
          resultArray.sort((a, b) =>
            new Date(a.date_modified) - new Date(b.date_modified) > 0 ? -1 : 1
          );
        }
        break;
      case "pertinence":
        if (trieDirection) {
          resultArray.sort((a, b) => (a.relevance - b.relevance > 0 ? 1 : -1));
        } else {
          resultArray.sort((a, b) => (b.relevance - a.relevance > 0 ? -1 : 1));
        }
        break;

      default:
        break;
    }

    setResultToDisplay(resultArray);
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
          setTrie={setTrie}
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
        <Tries onClick={() => activeTrie("vues")} isTrue={trie === "vues"}>
          nombre de vues{" "}
          {trieDirection && trie === "vues" ? (
            <i className="bi bi-arrow-up" style={{ marginLeft: "5px" }}></i>
          ) : (
            <i className="bi bi-arrow-down" style={{ marginLeft: "5px" }}></i>
          )}
        </Tries>
        <Tries onClick={() => activeTrie("date")} isTrue={trie === "date"}>
          dernière mise à jour{" "}
          {trieDirection && trie === "date" ? (
            <i className="bi bi-arrow-up" style={{ marginLeft: "5px" }}></i>
          ) : (
            <i className="bi bi-arrow-down" style={{ marginLeft: "5px" }}></i>
          )}
        </Tries>
        <Tries
          onClick={() => activeTrie("pertinence")}
          isTrue={trie === "pertinence"}
        >
          pertinence{" "}
          {trieDirection && trie === "pertinence" ? (
            <i className="bi bi-arrow-up" style={{ marginLeft: "5px" }}></i>
          ) : (
            <i className="bi bi-arrow-down" style={{ marginLeft: "5px" }}></i>
          )}
        </Tries>
      </TriesContainer>
      <BodyContainer isViewGrid={isViewGrid}>
        {resultToDisplay &&
          resultToDisplay.length > 0 &&
          resultToDisplay.map((item, index) => {
            if (
              item.type === "indicateurs" ||
              item.type === "documents" ||
              item.type === "articles"
            ) {
              let info = { ID: item.id, post_type: item.type };

              return isViewGrid ? (
                <GridResultComponent key={index} info={item} />
              ) : (
                <ListResultComponent key={index} info={item} />
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
