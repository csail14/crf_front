import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import DOMPurify from "dompurify";
import { colors } from "../../colors";
import { config } from "../../config";

const MainContainer = styled.div`
  min-height: 92vh;
`;

const HeaderContainer = styled.div`
  padding: 80px 140px;
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
`;

const Textcontainer = styled.div`
  padding: 70px 150px;
  color: ${colors.gris};
  text-align: justify;
`;

const OtherPage = (props) => {
  const template = props.pages.templates.length
    ? props.pages.templates.filter(
        (template) => template.slug === props.match.params.id
      )[0]
    : null;
  return (
    <MainContainer>
      <HeaderContainer>
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
      <BodyContainer>
        {template && (
          <Textcontainer
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(template.content.rendered),
            }}
          ></Textcontainer>
        )}
      </BodyContainer>
    </MainContainer>
  );
};

const mapDispatchToProps = {};

const mapStateToProps = (store) => {
  return { pages: store.pages };
};

export default connect(mapStateToProps, mapDispatchToProps)(OtherPage);
