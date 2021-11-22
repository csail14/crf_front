import React from "react";
import { connect } from "react-redux";
import GridResultComponent from "../../components/Resultats/gridResultComponent";
import styled from "styled-components";
import useMediaQuery from "@mui/material/useMediaQuery";
import RightSideLinkContainer from "./RightSideLinkContainer";
import DOMPurify from "dompurify";
import { colors } from "../../colors";
import { config } from "../../config";
const MainContainer = styled.div`
  min-height: 100vh;
  overflow-wrap: break-word;
`;

const HeaderContainer = styled.header`
  padding: ${(props) => (props.isMobile ? "30px" : "80px 10%")};
  text-align: left;
  background-image: url(${config.header_image_url});
  background-size: cover;
  background-position:bottom right;
`;

const HeaderTitleContainer = styled.h2`
  font-size: 45px;
  color: ${colors.marine};
  line-height: 58px;
  letter-spacing: 0em;
  text-transform: uppercase;
  margin: 0;
`;
const HeaderSubTitleContainer = styled.h3`
  font-size: 45px;
  color: ${colors.marine};
  line-height: 58px;
  letter-spacing: 0em;
  text-transform: uppercase;
  margin: 0;
  font-weight: 300;
`;

const SubtitleContainer = styled.p`
  margin-top: 26px;
  color: ${colors.gris};
`;
const BodyContainer = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.isMobile ? "column" : "")};
  justify-content: space-between;
  padding: ${(props) => (props.isMobile ? "40px 5%" : "70px 10%")};

`;

const Textcontainer = styled.div`
  padding: ${(props) => (props.isMobile ? "0" : "0")};
  color: ${colors.gris};
`;

const LinkTitleContainer = styled.div`
  font-weight: 700;
  font-size: 15px;
  color: ${colors.marine};
  text-transform: uppercase;
  margin-bottom: 30px;
`;
const LinkMainContainer = styled.aside`
  padding: 70px 50px;
  margin-right: 50px;
  text-align: left;
  flex-basis:40%;
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
  justify-content: ${(props) => (props.isMobile ? "center" : "left")};
  margin: 0 auto;
`;

const SubHome = (props) => {
  const subHomeTemplate = props.pages.templates.length
    ? props.pages.templates.filter((template) => template.slug === props.id)[0]
    : null;
  const isMobile = useMediaQuery(`(max-width:${config.breakPoint})`);
  return (
    <MainContainer>
      <HeaderContainer isMobile={isMobile}>
        {subHomeTemplate && subHomeTemplate.title && (
          <HeaderTitleContainer
            style={{ fontWeight: "700" }}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(subHomeTemplate.title.rendered),
            }}
          />
        )}

        <HeaderSubTitleContainer>
          {subHomeTemplate ? subHomeTemplate.acf.sous_titre : null}
        </HeaderSubTitleContainer>
        {subHomeTemplate && (
          <SubtitleContainer
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(subHomeTemplate.acf.intro),
            }}
          ></SubtitleContainer>
        )}
      </HeaderContainer>
      <BodyContainer isMobile={isMobile}>
        {subHomeTemplate && (
          <Textcontainer
            isMobile={isMobile}
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
                if (item.post_status === "publish")
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
        <AvailableRessourceContainer isMobile={isMobile}>
          {subHomeTemplate &&
            subHomeTemplate.acf.ressources_disponibles &&
            subHomeTemplate.acf.ressources_disponibles.ressources.map(
              (item, index) => {
                if (item.post_status === "publish")
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
