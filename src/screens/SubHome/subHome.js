import React from "react";
import { connect } from "react-redux";
import GridResultComponent from "../../components/Resultats/gridResultComponent";
import ListResultComponent from "../../components/Resultats/listResultComponent";
import styled from "styled-components";
import useMediaQuery from "@mui/material/useMediaQuery";
import RightSideLinkContainer from "./RightSideLinkContainer";
import DOMPurify from "dompurify";
import { colors } from "../../colors";
import { config } from "../../config";
import header from "../../assets/header.jpeg";
const MainContainer = styled.div`
  min-height: 100vh;
  overflow-wrap: break-word;
`;

const HeaderContainer = styled.header`
  padding: ${(props) => (props.isMobile ? "55px 6%" : "121px 9% 58px")};
  min-height: 378px;
  background-image: url(${header});
  background-size: cover;
  background-position: bottom right;
  @media screen and (max-width: 1024px) {
    min-height: auto;
  }
`;

const HeaderTitleContainer = styled.h1`
  font-size: 4.5rem;
  color: ${colors.marine};
  line-height: 50px;
  letter-spacing: 0.07rem;
  text-transform: uppercase;
  margin: 0;
  font-weight: 700;
  @media screen and (max-width: 1024px) {
    font-size: 2.4rem;
    line-height: 1.4;
  }
`;

const HeaderSubTitleContainer = styled.h2`
  font-size: 3rem;
  color: ${colors.marine};
  line-height: 42px;
  letter-spacing: 0.01em;
  text-transform: uppercase;
  margin: 0 0 34px;
  font-weight: 300;
  @media screen and (max-width: 1024px) {
    font-size: 2rem;
    line-height: 1.3;
    margin-bottom: 20px;
  }
`;

const SubtitleContainer = styled.div`
  margin-top: 26px;
  color: ${colors.gris};
  max-width: 800px;
  line-height: 1.8;
`;
const BodyContainer = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.isMobile ? "column" : "")};
  justify-content: space-between;
  padding: ${(props) => (props.isMobile ? "20px 0" : "41px 0 60px")};
  max-width: 1350px;
  width: 90%;
  margin: 0 auto;
`;

const Textcontainer = styled.div`
  padding: ${(props) => (props.isMobile ? "0" : "0")};
  flex-basis: 50%;
  line-height: 1.75;
  p {
    margin: 28px 0;
  }
`;

const LinkTitleContainer = styled.h2`
  font-weight: 700;
  font-size: 1.5rem;
  color: ${colors.marine};
  text-transform: uppercase;
  margin-bottom: 30px;
  margin-top: 0;
  letter-spacing: 0.1rem;
`;
const LinkMainContainer = styled.aside`
  padding: 36px 5% 0 0;
  flex-basis: 35%;
`;
const BottomContainer = styled.div`
  background-color: ${colors.grisBackground};
  padding: 89px 4% 50px;
  @media screen and (max-width: 1024px) {
    padding: 35px 5%;
  }
`;

const BottomTitleContainer = styled.h4`
  padding: 0;
  text-transform: uppercase;
  font-size: 1.4rem;
  color: ${colors.gris};
  font-weight: 600;
  margin: 0;
  text-align: center;
`;

const AvailableRessourceContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: ${(props) => (props.isMobile ? "center" : "left")};
  margin: 47px auto 0;
  @media screen and (max-width: 1024px) {
    padding: 25px auto 0;
  }
`;

const SubHome = (props) => {
  const subHomeTemplate = props.pages.templates.length
    ? props.pages.templates.filter((template) => template.slug === props.id)[0]
    : null;
  const isMobile = useMediaQuery(`(max-width:${config.breakPoint})`);

  const ressources_disponibles =
    subHomeTemplate &&
    subHomeTemplate.acf.ressources_dispos &&
    subHomeTemplate.acf.ressources_dispos.filter(
      (item) => item.status === "publish"
    );

  const dans_cette_rubrique =
    subHomeTemplate &&
    subHomeTemplate.acf &&
    subHomeTemplate.acf.ressources_rubrique &&
    subHomeTemplate.acf.ressources_rubrique.filter(
      (item) => item.status === "publish"
    );

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
            className="content_p"
            isMobile={isMobile}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(subHomeTemplate.content.rendered),
            }}
          ></Textcontainer>
        )}
        {dans_cette_rubrique.length > 0 && (
          <LinkMainContainer>
            <LinkTitleContainer>
              {subHomeTemplate &&
              subHomeTemplate.acf &&
              subHomeTemplate.acf.titre_rubrique
                ? subHomeTemplate.acf.titre_rubrique
                : "Dans cette rubrique"}
            </LinkTitleContainer>

            {dans_cette_rubrique.map((item, index) => {
              if (item.status === "publish")
                return <RightSideLinkContainer info={item} key={index} />;
              return undefined;
            })}
          </LinkMainContainer>
        )}
      </BodyContainer>
      {ressources_disponibles.length > 0 && (
        <BottomContainer>
          <BottomTitleContainer>
            {subHomeTemplate &&
            subHomeTemplate.acf &&
            subHomeTemplate.acf.titre_dispos
              ? subHomeTemplate.acf.titre_dispos
              : "Les ressources disponibles"}
          </BottomTitleContainer>
          <AvailableRessourceContainer isMobile={isMobile}>
            {ressources_disponibles.map((item, index) => {
              if (item.status === "publish")
                if (isMobile) {
                  return <ListResultComponent key={index} info={item} />;
                } else {
                  return <GridResultComponent key={index} info={item} />;
                }
              return undefined;
            })}
          </AvailableRessourceContainer>
        </BottomContainer>
      )}
    </MainContainer>
  );
};

const mapDispatchToProps = {};

const mapStateToProps = (store) => {
  return { pages: store.pages };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubHome);
