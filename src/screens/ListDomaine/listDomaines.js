import React from "react";
import { connect } from "react-redux";
import ApercuDomaine from "./domaineApercu";
import styled from "styled-components";
import { colors } from "../../colors";
import DOMPurify from "dompurify";
import useMediaQuery from "@mui/material/useMediaQuery";
import { config } from "../../config";
import header from "../../assets/header.jpeg";

const MainContainer = styled.div`
  min-height: 92vh;
`;

const HeaderContainer = styled.header`
  padding: ${(props) => (props.isMobile ? "30px" : "121px 9% 58px")};
  background-image: url(${header});
  background-size: cover;
  background-position: bottom right;
  min-height: 378px;
`;

const HeaderTitleContainer = styled.h2`
  font-size: 4.5rem;
  color: ${colors.marine};
  line-height: 50px;
  letter-spacing: 0.07rem;
  text-transform: uppercase;
  margin: 0;
`;

const HeaderSubTitleContainer = styled.h3`
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
const BodyContainer = styled.main`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: ${(props) => (props.isMobile ? "30px" : "0 9%")};
  justify-content: flex-start;
  margin-top: -29px;
`;

const ListDomaines = (props) => {
  const isMobile = useMediaQuery(`(max-width:${config.breakPoint})`);
  const slug = props.slug || "liste-des-indicateurs";
  const template = props.pages.templates.length
    ? props.pages.templates.filter((template) => template.slug === slug)[0]
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
        <HeaderSubTitleContainer>
          {" "}
          {template ? template.acf.sous_titre : "De la croix rouge française"}
        </HeaderSubTitleContainer>
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
            if (item.indicateurs.length) {
              return <ApercuDomaine info={item} key={index} />;
            }
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
