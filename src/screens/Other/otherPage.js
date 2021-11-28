import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import DOMPurify from "dompurify";
import { colors } from "../../colors";
import { config } from "../../config";
import SubHome from "../SubHome/subHome";
import useMediaQuery from "@mui/material/useMediaQuery";
import Recherche from "../Recherche/recherche";
import ListDomaines from "../ListDomaine/listDomaines";
import ImpactTrack from "../ImpactTrack/impactTrack";
import Contact from "../Contact/contact";

const MainContainer = styled.div`
  min-height: 92vh;
`;

const HeaderContainer = styled.header`
  padding: ${(props) => (props.isMobile ? "30px" : "121px 12% 58px")};
  background-image: url(${config.header_image_url});
  background-size: cover;
  background-position: bottom right;
`;

const HeaderTitleContainer = styled.h1`
  font-size: 4.5rem;
  color: ${colors.marine};
  line-height: 50px;
  letter-spacing: 0.07rem;
  text-transform: uppercase;
  margin: 0;
  font-weight: 700;
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
  max-width: 800px;
  line-height: 1.8;
`;
const BodyContainer = styled.main`
  display: flex;
  justify-content: center;
  flex-wrap: ${(props) => (props.isMobile ? "wrap" : "")};
`;

const Textcontainer = styled.div`
  padding: ${(props) => (props.isMobile ? "30px 0" : "100px 0")};
  color: ${colors.text};
  line-height: 1.9;
  max-width: 660px;
  margin: 0 auto;
  width: 90%;
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

const OtherPage = (props) => {
  const isMobile = useMediaQuery(`(max-width:${config.breakPoint})`);
  const slug = props.match && props.match.params && props.match.params.id;
  const template = props.pages.templates.length
    ? props.pages.templates.filter(
        (template) => template.slug === props.match.params.id
      )[0]
    : null;

  return (
    <>
      {template && template.template === "tpl-sous_home.php" ? (
        <SubHome id={props.match.params.id} />
      ) : template && template.template === "tpl-recherche.php" ? (
        <Recherche slug={slug} />
      ) : template && template.template === "tpl-liste-indicateurs.php" ? (
        <ListDomaines slug={slug} />
      ) : template && template.template === "tpl-it.php" ? (
        <ImpactTrack slug={slug} />
      ) : template && template.template === "tpl-contact.php" ? (
        <Contact slug={slug} />
      ) : slug === "home" ? (
        <></>
      ) : (
        <MainContainer>
          <HeaderContainer isMobile={isMobile}>
            {template && template.title && (
              <HeaderTitleContainer
                style={{ fontWeight: "700" }}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(template.title.rendered),
                }}
              />
            )}

            <HeaderSubTitleContainer>
              {template ? template.acf.sous_titre : null}
            </HeaderSubTitleContainer>
            {template && (
              <SubtitleContainer
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(template.acf.intro),
                }}
              ></SubtitleContainer>
            )}
          </HeaderContainer>
          <BodyContainer className="bodyContent" isMobile={isMobile}>
            {template && (
              <Textcontainer
                isMobile={isMobile}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(template.content.rendered),
                }}
              ></Textcontainer>
            )}
          </BodyContainer>
        </MainContainer>
      )}
    </>
  );
};

const mapDispatchToProps = {};

const mapStateToProps = (store) => {
  return { pages: store.pages };
};

export default connect(mapStateToProps, mapDispatchToProps)(OtherPage);
