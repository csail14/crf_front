import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { config } from "../../config";
import DomaineListDeroulante from "../../components/Ressource/DomainesListDeroulante";
import useMediaQuery from "@mui/material/useMediaQuery";
import IndicateurDetails from "../../components/Ressource/indicateursDetails";
import RessourcesSecondaires from "../../components/Ressource/ressourcesSecondaires";
import { useHistory } from "react-router-dom";
import DomainesDetails from "../../components/Ressource/domainesDetails";
import {
  loadKeywordsFilter,
  loadImpactsFilter,
  loadActionsFilter,
  resetAllFilter,
} from "../../actions/filter/filterActions";

require("moment/locale/fr.js");

const MainContainer = styled.main`
  display: flex;
  flex-direction: ${(props) => (props.isMobile ? "column" : "row")};
  background: linear-gradient(
      0deg,
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    radial-gradient(
      68.37% 320.65% at -18.36% 111.75%,
      rgba(0, 57, 86, 0.5) 0%,
      rgba(0, 57, 86, 0.19) 44.84%,
      rgba(255, 255, 255, 0.09) 100%
    ),
    radial-gradient(
      132.83% 171.01% at 94.89% 166.27%,
      rgba(227, 6, 19, 0.33) 0%,
      rgba(227, 6, 19, 0.219) 46.47%,
      rgba(255, 255, 255, 0.108) 100%
    );

  background-size: ${(props) => (props.isMobile ? "100% 320px" : "100% 378px")};
  background-repeat: no-repeat;
  position: relative;
  min-height: 95vh;
  @media screen and (max-width:1024px){
    min-height:auto;
    flex-direction:column-reverse;
    background:none;
  }
`;

const LeftSideComponent = styled.aside`
  position: -webkit-sticky;
  position: sticky;
  margin: 119px 5.5% 0 5%;
  flex-basis: 20%;
  @media screen and (max-width:1024px){
    margin: 20px 20px 0 5%;
  }
`;

const Indicateur = (props) => {
  const isMobile = useMediaQuery(`(max-width:${config.breakPoint})`);
  let history = useHistory();
  const id =
    history &&
    history.location &&
    history.location.state &&
    history.location.state.id;
  const slug = props.match && props.match.params && props.match.params.id;
  const type = history.location.pathname.includes("indicateurs")
    ? "indicateurs"
    : history.location.pathname.includes("domaine-impact")
    ? "domaine-impact"
    : null;

  useEffect(() => {
    props.resetAllFilter();
  }, []);

  return (
    <>
      <MainContainer isMobile={isMobile}>
        {!isMobile || (isMobile && type === "domaine-impact") &&(
          <LeftSideComponent>
            <DomaineListDeroulante slug={slug} id={id} />
          </LeftSideComponent>
        )}
          {type === "indicateurs" ? (
            <IndicateurDetails type={type} slug={slug} />
          ) : type === "domaine-impact" ? (
            <DomainesDetails slug={slug} id={id} />
          ) : null}
      </MainContainer>
      <RessourcesSecondaires type={type} slug={slug} />
    </>
  );
};

const mapDispatchToProps = {
  loadImpactsFilter,
  loadActionsFilter,
  loadKeywordsFilter,
  resetAllFilter,
};

const mapStateToProps = (store) => {
  return {
    taxonomie: store.taxonomie,
    pages: store.pages,
    filters: store.filters,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Indicateur);
