import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { MdArrowForwardIos } from "react-icons/md";
import GridResultComponent from "../../components/Resultats/gridResultComponent";
import styled from "styled-components";
import union from "../../assets/union.png";

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
  justify-content: center;
`;

const SubHome = (props) => {
  return (
    <MainContainer>
      <HeaderContainer>
        <HeaderTitleContainer style={{ fontWeight: "700" }}>
          définir mes indicateurs
        </HeaderTitleContainer>
        <HeaderTitleContainer>
          pour mesurer mon impact social
        </HeaderTitleContainer>
        <SubtitleContainer>
          Choisissez ci-dessous le domaine d’impact concerné par votre besoin de
          mesure :
        </SubtitleContainer>
      </HeaderContainer>
      <BodyContainer>
        <Textcontainer>
          Auctor nunc eget consequat velit, est feugiat est. Tempor vitae
          viverra fringilla molestie felis faucibus. Morbi cras tortor purus
          nibh enim, sapien lorem id commodo. Molestie bibendum egestas in
          risus, porttitor orci velit sed sociis. Condimentum feugiat adipiscing
          velit orci justo amet, euismod. Aliquam enim lectus ut magna.
          Convallis diam in pretium dictum aliquam. A nisl cum arcu, lorem eget
          eu diam. Ac quam risus eu amet, molestie diam ultricies. Amet, amet
          turpis pellentesque egestas. Massa placerat euismod gravida ut. Sed
          nibh volutpat donec et lobortis proin. Adipiscing at ante nunc diam
          maecenas viverra id. Est sed netus eget iaculis. Vestibulum in vitae
          mauris rhoncus, pellentesque tempor. Sed cursus odio cras sed enim
          amet, massa id neque. Potenti nibh ac integer tellus. In vitae in
          vestibulum etiam justo tristique donec aliquet. Lectus fames egestas
          lorem tristique ac gravida in massa. Enim sollicitudin viverra mauris
          phasellus. Bibendum enim velit tortor faucibus. Tempor dui, est
          aliquam et lectus congue pretium tristique eget. Tincidunt et lorem
          feugiat consequat nisi. Lacus quis sapien, sit blandit.
        </Textcontainer>
        <LinkMainContainer>
          <LinkTitleContainer>Dans cette rubrique</LinkTitleContainer>
          <LinkContainer>
            Mesurer l'impact social de la Croix-Rouge française, c'est nouveau ?
            <MdArrowForwardIos style={{ color: colors.rouge }} />
          </LinkContainer>
          <LinkContainer>
            Mesurer l'impact social de la Croix-Rouge française, c'est nouveau ?
            <MdArrowForwardIos style={{ color: colors.rouge }} />
          </LinkContainer>
          <LinkContainer>
            Mesurer l'impact social de la Croix-Rouge française, c'est nouveau ?
            <MdArrowForwardIos style={{ color: colors.rouge }} />
          </LinkContainer>
          <LinkContainer>
            Mesurer l'impact social de la Croix-Rouge française, c'est nouveau ?
            <MdArrowForwardIos style={{ color: colors.rouge }} />
          </LinkContainer>
          <LinkContainer>
            Mesurer l'impact social de la Croix-Rouge française, c'est nouveau ?
            <MdArrowForwardIos style={{ color: colors.rouge }} />
          </LinkContainer>
          <LinkContainer>
            Mesurer l'impact social de la Croix-Rouge française, c'est nouveau ?
            <MdArrowForwardIos style={{ color: colors.rouge }} />
          </LinkContainer>
        </LinkMainContainer>
      </BodyContainer>
      <BottomContainer>
        <BottomTitleContainer>Les ressources disponibles</BottomTitleContainer>
        <AvailableRessourceContainer>
          <GridResultComponent /> <GridResultComponent />
          <GridResultComponent /> <GridResultComponent />
        </AvailableRessourceContainer>
      </BottomContainer>
    </MainContainer>
  );
};

const mapDispatchToProps = {};

const mapStateToProps = (store) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SubHome);
