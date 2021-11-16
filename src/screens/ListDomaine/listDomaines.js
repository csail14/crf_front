import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import ApercuDomaine from "./domaineApercu";
import styled from "styled-components";
import { colors } from "../../colors";
import DOMPurify from "dompurify";
import useMediaQuery from "@mui/material/useMediaQuery";
import { config } from "../../config";
const MainContainer = styled.div`
  min-height: 92vh;
`;

const HeaderContainer = styled.div`
  padding: ${(props) => (props.isMobile ? "30px" : "80px 140px")};
  text-align: left;
  background: radial-gradient(
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
`;
const BodyContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding-right: ${(props) => (props.isMobile ? "30px" : "150px")};
  padding-left: ${(props) => (props.isMobile ? "30px" : "140px")};
  justify-content: flex-start;
  margin-top: -25px;
`;

const ListDomaines = (props) => {
  const isMobile = useMediaQuery(`(max-width:${config.breakPoint})`);

  const template = props.pages.templates.length
    ? props.pages.templates.filter(
        (template) => template.slug === "liste-des-indicateurs"
      )[0]
    : null;

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
          <HeaderTitleContainer>
            L'impact social des actions
          </HeaderTitleContainer>
        )}
        <HeaderTitleContainer>
          {" "}
          {template ? template.acf.sous_titre : "De la croix rouge française"}
        </HeaderTitleContainer>
        {template && (
          <SubtitleContainer
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(template.acf.intro),
            }}
          ></SubtitleContainer>
        )}
      </HeaderContainer>
      <BodyContainer isMobile={isMobile}>
        {props.taxonomie &&
          props.taxonomie.domainesImpacts &&
          props.taxonomie.domainesImpacts.map((item, index) => {
            return <ApercuDomaine info={item} key={index} />;
          })}
      </BodyContainer>
    </MainContainer>
  );
};

const mapDispatchToProps = {};

const mapStateToProps = (store) => {
  return {
    pages: store.pages,
    taxonomie: store.taxonomie,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListDomaines);
