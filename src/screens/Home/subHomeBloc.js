import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import blocImage from "../../assets/blocImageExemple.svg";
import { colors } from "../../colors";
import { MdArrowForwardIos } from "react-icons/md";
const MainContainer = styled.div`
  margin: 50px 35px;
  max-width: 400px;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: ${colors.grisBackground};
  min-height: 250px;
  min-width: 250px;
  border-radius: 8px;
  align-items: center;
  box-shadow: 0px 4px 8px rgba(35, 45, 66, 0.05);
`;

const TitleContainer = styled.div`
  color: ${colors.rouge};
  margin-top: 30px;
  padding: 5px;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 26px;
`;

const SubTitleContainer = styled.div`
  color: ${colors.marine};
  padding: 5px;
  font-size: 16px;
  font-weight: 700;
`;

const LinkMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;
const LinkContainer = styled.div`
  display: flex;
  box-shadow: 0px 4px 8px rgba(35, 45, 66, 0.05);
  padding: 15px 20px;
  color: ${colors.marine};
  font-weight: 700;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

const MoreInfoContainer = styled.div`
  display: flex;
  color: ${colors.rouge};
  margin-top: 30px;
  padding: 5px;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 12px;
  justify-content: center;
  cursor: pointer;
`;

const SubHomeBloc = (props) => {
  return (
    <MainContainer>
      <HeaderContainer>
        {" "}
        <img style={{ maxHeight: "130px" }} src={blocImage} alt="blocImage" />
        <TitleContainer>Je m'informe</TitleContainer>
        <SubTitleContainer>sur la démarche d’impact social</SubTitleContainer>
      </HeaderContainer>
      <LinkMainContainer>
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
      <MoreInfoContainer>
        En savoir plus{" "}
        <MdArrowForwardIos
          style={{ color: colors.rouge, marginLeft: "10px" }}
        />
      </MoreInfoContainer>
    </MainContainer>
  );
};

const mapDispatchToProps = {};

const mapStateToProps = (store) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SubHomeBloc);
