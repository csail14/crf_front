import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { colors } from "../../colors";
import { getRessourceById } from "../../utils/api/RessourcesApi";
import DOMPurify from "dompurify";
import { Link } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";

import {
  loadKeywordsFilter,
  loadImpactsFilter,
  loadActionsFilter,
  resetAllFilter,
} from "../../actions/filter/filterActions";

const RightSideContainer = styled.div`
  width: -webkit-fill-available;
  display: flex;
  flex-direction: column;
`;
const HeaderRightSideTopContainer = styled.div`
  width: -webkit-fill-available;
  padding: ${(props) => (props.isMobile ? "10px 20px" : "50px 0px")};
`;

const TitleContainer = styled.div`
  font-size: 35px;
  font-weight: 700;
  line-height: 58px;
  text-align: left;
  color: ${colors.marine};
`;

const BodyContainer = styled.div`
  display: flex;
  padding: ${(props) => (props.isMobile ? "10px 20px" : "50px 0px")};
`;

const LeftSideBodyComponent = styled.div``;

const ContentContainer = styled.div`
  font-size: 18px;
  font-weight: 400;
  line-height: 31px;
  color: ${colors.text};
  text-align: left;
`;

const ArianeContainer = styled.div`
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;
  display: flex;
  align-items: center;
  color: #99a0b1;
  padding-bottom: 40px;
`;

const Indicateur = (props) => {
  const [domaine, setDomaine] = useState(null);
  const isMobile = useMediaQuery("(max-width:600px)");
  useEffect(() => {
    props.resetAllFilter();
    getRessourceById(domaineId, "domaine-impact")
      .then((res) => setDomaine(res))
      .catch((error) => console.log(error));
  }, []);

  const domaineId = props.id[0];
  const listIndicateurTemplate = props.pages.templates.length
    ? props.pages.templates.filter(
        (template) => template.slug === "liste-des-indicateurs"
      )[0]
    : null;
  return (
    <RightSideContainer>
      <HeaderRightSideTopContainer isMobile={isMobile}>
        <ArianeContainer>
          <Link
            to={"/liste-des-indicateurs"}
            style={{
              textDecoration: "none",
              color: colors.gris,
              margin: "0 5px",
            }}
          >
            {listIndicateurTemplate &&
              listIndicateurTemplate.title &&
              listIndicateurTemplate.title.rendered}{" "}
          </Link>
          {" > "}
          <div
            style={{
              color: colors.gris,
              margin: "0 5px",
            }}
          >
            {domaine && domaine.name}
          </div>
        </ArianeContainer>

        {domaine !== null && domaine.name && (
          <TitleContainer
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(domaine.name),
            }}
          />
        )}
      </HeaderRightSideTopContainer>

      <BodyContainer isMobile={isMobile}>
        <LeftSideBodyComponent>
          {domaine && domaine.acf && domaine.acf.details && (
            <ContentContainer
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(domaine.acf.details),
              }}
            />
          )}
        </LeftSideBodyComponent>
      </BodyContainer>
    </RightSideContainer>
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