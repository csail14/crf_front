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
  padding: ${(props) => (props.isMobile ? "30px" : "80px 10%")};

  text-align: left;
  background-image: url(${config.header_image_url});
  background-size: cover;
  background-position: bottom right;
`;

const HeaderTitleContainer = styled.h2`
  font-size: 45px;
  color: ${colors.marine};
  line-height: 58px;
  letter-spacing: 0em;
  text-transform: uppercase;
`;

const HeaderSubTitleContainer = styled.h3`
  font-size: 45px;
  color: ${colors.marine};
  line-height: 58px;
  letter-spacing: 0em;
  text-transform: uppercase;
  font-weight: 300;
`;

const SubtitleContainer = styled.div`
  margin-top: 26px;
  color: ${colors.gris};
`;
const BodyContainer = styled.main`
  display: flex;
  justify-content: center;
  flex-wrap: ${(props) => (props.isMobile ? "wrap" : "")};
`;

const Textcontainer = styled.div`
  padding: ${(props) => (props.isMobile ? "30px" : "70px 150px")};
  color: ${colors.gris};
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
          <BodyContainer isMobile={isMobile}>
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
