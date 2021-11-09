import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { getRessourceById } from "../../utils/api/RessourcesApi";
import { Link } from "react-router-dom";
import DomaineListDeroulante from "../../components/Ressource/DomainesListDeroulante";
import { isMobile } from "react-device-detect";
import IndicateurDetails from "../../components/Ressource/indicateursDetails";
import RessourcesSecondaires from "../../components/Ressource/ressourcesSecondaires";
import {
  loadKeywordsFilter,
  loadImpactsFilter,
  loadActionsFilter,
  resetAllFilter,
} from "../../actions/filter/filterActions";

require("moment/locale/fr.js");

const MainContainer = styled.div`
  display: flex;
  flex-direction: ${isMobile ? "column" : "row"};
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

  background-size: ${isMobile ? "100% 480px" : "100% 250px"};
  background-repeat: no-repeat;
  padding-right: ${isMobile ? "" : "100px"};
  position: relative;
`;

const LeftSideComponent = styled.div`
  display: flex;
  position: -webkit-sticky;
  position: sticky;
  top: 100px;
  padding: 100px 85px;
`;

const Indicateur = (props) => {
  const [indicateur, setIndicateur] = useState(null);
  const [indicateurId, setIndicateurId] = useState(props.match.params.id);
  useEffect(() => {
    props.resetAllFilter();
    getRessourceById(indicateurId, "indicateurs")
      .then((res) => setIndicateur(res))
      .catch((error) => console.log(error));
  }, []);

  let tags = indicateur && indicateur.tags;

  if (tags && props.taxonomie && props.taxonomie.tags.length) {
    tags = tags.map((item) => {
      return props.taxonomie.tags.filter((el) => el.id === item)[0];
    });
  }

  return (
    <>
      <MainContainer>
        {!isMobile && (
          <LeftSideComponent>
            <DomaineListDeroulante id={indicateurId} />
          </LeftSideComponent>
        )}
        <IndicateurDetails id={indicateurId} />
      </MainContainer>
      <RessourcesSecondaires id={indicateurId} />
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
