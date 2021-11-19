import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { colors } from "../../colors";
import GridResultComponent from "../../components/Resultats/gridResultComponent";
import ListResultComponent from "../../components/Resultats/listResultComponent";
import { getRessourceById } from "../../utils/api/RessourcesApi";
import useMediaQuery from "@mui/material/useMediaQuery";
import { config } from "../../config";
import {
  loadKeywordsFilter,
  loadImpactsFilter,
  loadActionsFilter,
  resetAllFilter,
} from "../../actions/filter/filterActions";

require("moment/locale/fr.js");

const BottomContainer = styled.section`
  background-color: ${colors.grisBackground};
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;
const BottomTitleContainer = styled.div`
  margin: 50px;
  text-transform: uppercase;
  font-size: 14px;
  color: ${colors.gris};
  font-weight: 600;
`;

const AvailableRessourceContainer = styled.div`
  padding: 0 18px;
  display: flex;
  flex-wrap: wrap;
  justify-content: ${(props) => (props.isMobile ? "center" : "left")};
  margin: 0 auto;
`;

const Indicateur = (props) => {
  const [indicateur, setIndicateur] = useState(null);
  const isMobile = useMediaQuery(`(max-width:${config.breakPoint})`);
  useEffect(() => {
    props.resetAllFilter();
    getRessourceById(indicateurId, props.type)
      .then((res) => setIndicateur(res))
      .catch((error) => console.log(error));
  }, []);

  const indicateurId = props.id[0];

  let tags = indicateur && indicateur.tags;

  if (tags && props.taxonomie && props.taxonomie.tags.length) {
    tags = tags.map((item) => {
      return props.taxonomie.tags.filter((el) => el.id === item)[0];
    });
  }

  return (
    <BottomContainer>
      <BottomTitleContainer>Ressources liées</BottomTitleContainer>
      <AvailableRessourceContainer isMobile={isMobile}>
        {indicateur &&
          indicateur.acf &&
          indicateur.acf.ressources_liees &&
          indicateur.acf.ressources_liees.length &&
          indicateur.acf.ressources_liees.map((item, index) => {
            if (("item", item.post_status === "publish"))
              if (isMobile) {
                return <ListResultComponent key={index} info={item} />;
              } else {
                return <GridResultComponent key={index} info={item} />;
              }
          })}
      </AvailableRessourceContainer>
    </BottomContainer>
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
