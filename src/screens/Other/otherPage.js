import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import DOMPurify from "dompurify";
import { colors } from "../../colors";
import { config } from "../../config";
import SubHome from "../SubHome/subHome";
import useMediaQuery from "@mui/material/useMediaQuery";

const MainContainer = styled.div`
  min-height: 92vh;
`;

const HeaderContainer = styled.div`
  padding: ${(props) => (props.isMobile ? "30px" : "80px 140px")};

  text-align: left;
  background-image: url(${config.header_image_url});
  background-size: cover;
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
  flex-wrap: ${(props) => (props.isMobile ? "wrap" : "")};
`;

const Textcontainer = styled.div`
  padding: ${(props) => (props.isMobile ? "30px" : "70px 150px")};
  color: ${colors.gris};
  text-align: justify;
`;

const OtherPage = (props) => {
  const isMobile = useMediaQuery(`(max-width:${config.breakPoint})`);

  const template = props.pages.templates.length
    ? props.pages.templates.filter(
        (template) => template.slug === props.match.params.id
      )[0]
    : null;
  return (
    <>
      {template && template.template === "tpl-sous_home.php" ? (
        <SubHome id={props.match.params.id} />
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

            <HeaderTitleContainer>
              {template ? template.acf.sous_titre : null}
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
