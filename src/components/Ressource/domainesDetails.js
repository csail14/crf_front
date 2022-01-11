import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Redirect } from "react-router-dom";
import { colors } from "../../colors";
import {
  getRessourceById,
  getRessourceBySlug,
} from "../../utils/api/RessourcesApi";
import DOMPurify from "dompurify";
import { Link } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { config } from "../../config";
import {
  loadKeywordsFilter,
  loadImpactsFilter,
  loadActionsFilter,
  resetAllFilter,
} from "../../actions/filter/filterActions";

const RightSideContainer = styled.section`
  display: flex;
  flex-direction: column;
  flex-basis: 60%;
  margin-bottom: 50px;
  max-width: 660px;
  @media screen and (max-width: 1024px) {
    margin-bottom: 0;
  }
`;
const HeaderRightSideTopContainer = styled.header`
  min-height: 378px;
  padding: ${(props) => (props.isMobile ? "30px 20px 10px" : "63px 0px 30px")};
  @media screen and (max-width: 1024px) {
    min-height: auto;
  }
`;

const TitleContainer = styled.h1`
  font-size: 4.5rem;
  font-weight: 700;
  line-height: 58px;
  text-transform: uppercase;
  color: ${colors.marine};
  margin: 0;
  letter-spacing: 0.05rem;
  margin-bottom: 32px;
  @media screen and (max-width: 1024px) {
    font-size: 2.4rem;
    line-height: 1.4;
    margin-bottom: 0px;
  }
`;

const BodyContainer = styled.section`
  margin-top: 33px;
  @media screen and (max-width: 1024px) {
    padding: 10px 20px;
    margin: 0;
  }
`;

const LeftSideBodyComponent = styled.div``;

const ContentContainer = styled.div`
  line-height: 1.9;
  & > *:first-child {
    margin-top: 0;
  }
  h2 {
    font-size: 3.5rem;
    line-height: 45px;
    color: #003956;
    text-transform: uppercase;
    margin: 20px 0 12px;
  }
  h3 {
    text-transform: uppercase;
    font-size: 1.8rem;
    margin: 20px 0 12px;
  }
  ul {
    padding-left: 13px;
    li {
      margin: 17px 0;
      &::marker {
        color: ${colors.rouge};
      }
    }
  }
  a {
    color: ${colors.rouge};
    font-weight: bold;
  }
  p {
    margin: 12px 0;
  }
`;

const ArianeContainer = styled.div`
  font-weight: 600;
  font-size: 1.2rem;
  line-height: 14px;
  display: flex;
  align-items: center;
  color: #99a0b1;
  padding-bottom: 45px;
  a,
  div {
    color: #99a0b1;
    margin: 0 5px;
  }
  div:not(:last-of-type) {
    cursor: pointer;
  }
  a {
    margin-left: 0;
  }
  @media screen and (max-width: 1024px) {
    padding-bottom:20px;
  }
`;

const Indicateur = (props) => {
  const [domaine, setDomaine] = useState(null);
  const isMobile = useMediaQuery(`(max-width:${config.breakPoint})`);
  const [notFound, setNotFound] = useState(false);
  useEffect(() => {
    props.resetAllFilter();
    if (props.slug) {
      getRessourceBySlug(props.slug, "domaine-impact")
        .then((res) => {
          if (res.length) {
            setDomaine(res[0]);
          } else if (props.slug) {
            setNotFound(true);
          }
        })
        .catch((error) => console.log(error));
    } else {
      getRessourceById(domaineId, "domaine-impact")
        .then((res) => setDomaine(res))
        .catch((error) => console.log(error));
    }
  }, []);

  const domaineId = props.id && props.id[0];
  const listIndicateurTemplate = props.pages.templates.length
    ? props.pages.templates.filter(
        (template) => template.slug === "liste-des-indicateurs"
      )[0]
    : null;
  return (
    <RightSideContainer>
      {notFound && <Redirect to="/404Error" />}
      <HeaderRightSideTopContainer isMobile={isMobile}>
        <ArianeContainer>
          <Link to={"/liste-des-indicateurs"} className="cliquable_link">
            {listIndicateurTemplate &&
              listIndicateurTemplate.title &&
              listIndicateurTemplate.title.rendered}{" "}
          </Link>
          {" > "}
          <div>{domaine && domaine.name}</div>
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
          {domaine && domaine.acf && domaine.acf.detail && (
            <ContentContainer
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(domaine.acf.detail),
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
