import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { MdArrowForwardIos } from "react-icons/md";
import GridResultComponent from "../../components/Resultats/gridResultComponent";
import styled from "styled-components";

import RightSideLinkContainer from "./RightSideLinkContainer";
import DOMPurify from "dompurify";
import { Link } from "react-router-dom";
import { colors } from "../../colors";
const MainContainer = styled.div`
  min-height: 100vh;
`;

const HeaderContainer = styled.div`
  padding: 80px 140px;
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
`;

const Textcontainer = styled.div`
  padding: 70px 150px;
  color: ${colors.gris};
  text-align: justify;
`;
const LinkContainer = styled.div`
  display: flex;
  box-shadow: 0px 4px 8px rgba(35, 45, 66, 0.05);
  padding: 15px 20px;
  color: ${colors.marine};
  font-weight: 600;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  min-width: 300px;
  margin-bottom: 10px;
`;
const LinkTitleContainer = styled.div`
  font-weight: 700;
  font-size: 15px;
  color: ${colors.marine};
  text-transform: uppercase;
  margin-bottom: 30px;
`;
const LinkMainContainer = styled.div`
  padding: 70px 50px;
  margin-right: 50px;
  text-align: left;
`;
const BottomContainer = styled.div`
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
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  margin: 0 auto;
`;

const SubHome = (props) => {
  const subHomeTemplate = props.pages.templates.length
    ? props.pages.templates.filter(
        (template) => template.slug === props.match.params.id
      )[0]
    : null;
  return (
    <MainContainer>
      <HeaderContainer>
        {subHomeTemplate && subHomeTemplate.title && (
          <HeaderTitleContainer
            style={{ fontWeight: "700" }}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(subHomeTemplate.title.rendered),
            }}
          />
        )}

        <HeaderTitleContainer>
          {subHomeTemplate ? subHomeTemplate.acf.sous_titre : null}
        </HeaderTitleContainer>
        {subHomeTemplate && (
          <SubtitleContainer
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(subHomeTemplate.acf.intro),
            }}
          ></SubtitleContainer>
        )}
      </HeaderContainer>
      <BodyContainer>
        {subHomeTemplate && (
          <Textcontainer
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(subHomeTemplate.content.rendered),
            }}
          ></Textcontainer>
        )}
        <LinkMainContainer>
          <LinkTitleContainer>
            {subHomeTemplate &&
            subHomeTemplate.acf &&
            subHomeTemplate.acf.dans_cette_rubrique_2
              ? subHomeTemplate.acf.dans_cette_rubrique_2.titre
              : "Dans cette rubrique"}
          </LinkTitleContainer>
          {subHomeTemplate &&
            subHomeTemplate.acf &&
            subHomeTemplate.acf.dans_cette_rubrique_2 &&
            subHomeTemplate.acf.dans_cette_rubrique_2.ressources.map(
              (item, index) => {
                return <RightSideLinkContainer info={item} key={index} />;
              }
            )}
        </LinkMainContainer>
      </BodyContainer>
      <BottomContainer>
        <BottomTitleContainer>
          {subHomeTemplate &&
          subHomeTemplate.acf &&
          subHomeTemplate.acf.ressources_disponibles
            ? subHomeTemplate.acf.ressources_disponibles.titre
            : "Les ressources disponibles"}
        </BottomTitleContainer>
        <AvailableRessourceContainer>
          {subHomeTemplate &&
            subHomeTemplate.acf.ressources_disponibles &&
            subHomeTemplate.acf.ressources_disponibles.ressources.map(
              (item, index) => {
                return <GridResultComponent key={index} info={item} />;
              }
            )}
        </AvailableRessourceContainer>
      </BottomContainer>
    </MainContainer>
  );
};

const mapDispatchToProps = {};

const mapStateToProps = (store) => {
  return { pages: store.pages };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubHome);
