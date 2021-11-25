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
  padding: ${(props) => (props.isMobile ? "30px" : "121px 9% 58px")};
  min-height:378px;
  background-image: url(${config.header_image_url});
  background-size: cover;
  background-position:bottom right;
`;

const HeaderTitleContainer = styled.h1`
  font-size: 4.5rem;
  color: ${colors.marine};
  line-height: 50px;
  letter-spacing: 0.07rem;
  text-transform: uppercase;
  margin: 0;
  font-weight:700;
`;

const HeaderSubTitleContainer = styled.h2`
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
  max-width:800px;
  line-height:1.8;
`;
const BodyContainer = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.isMobile ? "column" : "")};
  justify-content: space-between;
  padding: ${(props) => (props.isMobile ? "40px 5%" : "41px 0 60px")};
  max-width:1350px;
  width:90%;
  margin:0 auto;
`;

const Textcontainer = styled.div`
  padding: ${(props) => (props.isMobile ? "0" : "0")};
  flex-basis: 50%;
  line-height:1.75;
  p{
    margin:28px 0;
  }
`;

const LinkTitleContainer = styled.h2`
  font-weight: 700;
  font-size: 1.5rem;
  color: ${colors.marine};
  text-transform: uppercase;
  margin-bottom: 30px;
  margin-top:0;
  letter-spacing: 0.1rem;
`;
const LinkMainContainer = styled.aside`
  padding: 36px 5% 0 0;
  flex-basis: 35%;
`;
const BottomContainer = styled.div`
  background-color: ${colors.grisBackground};
  padding:89px 4% 50px;
`;

const BottomTitleContainer = styled.h4`
  padding: 0;
  text-transform: uppercase;
  font-size: 1.4rem;
  color: ${colors.gris};
  font-weight: 600;
  margin:0;
  text-align: center;
`;

const AvailableRessourceContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: ${(props) => (props.isMobile ? "center" : "left")};
  margin: 47px auto 0;
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
            className="content_p"
            isMobile={isMobile}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(subHomeTemplate.content.rendered),
            }}
          ></Textcontainer>
        )}
        {subHomeTemplate &&
          subHomeTemplate.acf &&
          subHomeTemplate.acf.dans_cette_rubrique_2 &&
          subHomeTemplate.acf.dans_cette_rubrique_2.ressources.length > 0 && (
            <LinkMainContainer>
              <LinkTitleContainer>
                {subHomeTemplate &&
                subHomeTemplate.acf &&
                subHomeTemplate.acf.dans_cette_rubrique_2
                  ? subHomeTemplate.acf.dans_cette_rubrique_2.titre
                  : "Dans cette rubrique"}
              </LinkTitleContainer>

              {subHomeTemplate.acf.dans_cette_rubrique_2.ressources.map(
                (item, index) => {
                  if (item.post_status === "publish")
                    return <RightSideLinkContainer info={item} key={index} />;
                }
              )}
            </LinkMainContainer>
          )}
      </BodyContainer>
      {subHomeTemplate &&
        subHomeTemplate.acf.ressources_disponibles &&
        subHomeTemplate.acf.ressources_disponibles.ressources.length > 0 && (
          <BottomContainer>
            <BottomTitleContainer>
              {subHomeTemplate &&
              subHomeTemplate.acf &&
              subHomeTemplate.acf.ressources_disponibles
                ? subHomeTemplate.acf.ressources_disponibles.titre
                : "Les ressources disponibles"}
            </BottomTitleContainer>
            <AvailableRessourceContainer isMobile={isMobile}>
              {subHomeTemplate.acf.ressources_disponibles.ressources.map(
                (item, index) => {
                  if (item.post_status === "publish")
                    return <GridResultComponent key={index} info={item} />;
                }
              )}
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
