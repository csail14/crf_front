import React, { useState } from "react";
import { connect } from "react-redux";
import SearchBar from "../../components/Recherche/searchBar";
import styled from "styled-components";
import { colors } from "../../colors";
import DOMPurify from "dompurify";
import { config } from "../../config";
import { isMobile } from "react-device-detect";

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
  display: flex;
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

const Recherche = (props) => {
  const [isViewGrid, setIsViewGrid] = useState(true);
  const [allRessources, setAllRessources] = useState([]);
  const template = props.pages.templates.length
    ? props.pages.templates.filter(
        (template) => template.slug === "recherche"
      )[0]
    : null;

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleIsSearchOpen = (isOpen) => {
    setIsSearchOpen(isOpen);
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
          18{" "}
          <div style={{ fontSize: "28px", marginLeft: "5px" }}> Résultats</div>
        </NumberResultsContainer>
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
      <BodyContainer></BodyContainer>
    </MainContainer>
  );
};

const mapDispatchToProps = {};

const mapStateToProps = (store) => {
  return {
    pages: store.pages,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Recherche);
