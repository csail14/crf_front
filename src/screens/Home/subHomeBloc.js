/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { colors } from "../../colors";
import { MdArrowForwardIos } from "react-icons/md";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useHistory } from "react-router-dom";
import { config } from "../../config";
const MainContainer = styled.div`
  flex-basis: 30%;
  display: flex;
  flex-direction: column;
  a:last-of-type {
    margin-top: auto;
  }
  @media screen and (max-width: 1280px) {
    flex-basis: 48%;
    margin-bottom: 50px;
    &:nth-of-type(3) {
      margin: auto;
    }
  }
`;

const HeaderContainer = styled.article`
  display: flex;
  cursor: pointer;
  flex-direction: column;
  padding: 52px 10% 59px;
  background-color: ${colors.grisBackground};
  border-radius: 8px;
  align-items: center;
  box-shadow: 0px 4px 8px rgba(35, 45, 66, 0.05);
  transition: all 150ms linear;
  text-align: center;
  &:hover {
    box-shadow: 6px 8px 20px 0px rgba(0, 0, 0, 0.2);
  }
  figure {
    height: 179px;
    margin: 0;
    display: flex;
    img {
      margin: auto;
    }
  }
  @media screen and (max-width: 1024px) {
    padding: 30px 5% 30px;
  }
`;

const TitleContainer = styled.h2`
  color: ${colors.rouge};
  margin: 53px 0 0;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 2.6rem;
  letter-spacing: 0.3rem;
  @media screen and (max-width: 1024px) {
    font-size: 2rem;
  }
`;

const SubTitleContainer = styled.p`
  color: ${colors.marine};
  margin: 5px 0 0;
  font-size: 1.6rem;
  @media screen and (max-width: 1024px) {
    font-size: 1.4rem;
  }
`;

const LinkMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;
const LinkContainer = styled.h3`
  display: flex;
  box-shadow: 0px 4px 8px rgba(35, 45, 66, 0.05);
  padding: 16px 3% 12px 6%;
  margin: 6px 0;
  color: ${colors.marine};
  line-height: 1.4;
  font-weight: 600;
  font-size: 1.6rem;
  letter-spacing: 0.2rem;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: all 150ms;
  &:hover {
    box-shadow: 2px 6px 15px 0px rgba(0, 0, 0, 0.2);
    transform: scale(0.98);
  }
  @media screen and (max-width: 1024px) {
    font-size: 1.4rem;
  }
`;

const MoreInfoContainer = styled.div`
  display: flex;
  color: ${colors.rouge};
  margin-top: 45px;
  padding: 5px;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 1.2rem;
  justify-content: center;
  cursor: pointer;
  letter-spacing: 0.1rem;
  @media screen and (max-width: 1024px) {
    margin-bottom: 40px;
    margin-top: 25px;
  }
`;

const Text = styled.div`
  transition: opacity 150ms linear, transform 150ms linear;
  &:hover {
    opacity: 0.8;
    transform: scale(0.98);
  }
`;

const SubHomeBloc = (props) => {
  const isMobile = useMediaQuery(`(max-width:${config.breakPoint})`);

  const link = props.info.push.lien;
  let history = useHistory();

  return (
    <MainContainer isMobile={isMobile}>
      <a href={props.isSearchOpen ? "#" : link}>
        <HeaderContainer>
          {" "}
          <figure>
            <img
              src={props.info.push.image.url ? props.info.push.image.url : null}
              alt="blocImage"
            />
          </figure>
          <TitleContainer>
            {props.info.push.titre ? props.info.push.titre : ""}
          </TitleContainer>
          <SubTitleContainer>
            {" "}
            {props.info.push.sous_titre ? props.info.push.sous_titre : ""}
          </SubTitleContainer>
        </HeaderContainer>
      </a>
      <LinkMainContainer>
        {props.info.articles_lies
          ? props.info.articles_lies.map((item, index) => {
              return (
                <LinkContainer
                  key={index}
                  onClick={() => {
                    !props.isSearchOpen
                      ? history.push({
                          pathname: "/" + item.post_type + "/" + item.post_name,
                          state: { id: item.id },
                        })
                      : console.log();
                  }}
                >
                  {item.post_title}
                  <MdArrowForwardIos style={{ color: colors.rouge }} />
                </LinkContainer>
              );
            })
          : null}
      </LinkMainContainer>
      <a href={link}>
        <MoreInfoContainer>
          <Text>
            En savoir plus
            <MdArrowForwardIos
              style={{ color: colors.rouge, marginLeft: "10px" }}
            />{" "}
          </Text>
        </MoreInfoContainer>
      </a>
    </MainContainer>
  );
};

const mapDispatchToProps = {};

const mapStateToProps = (store) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SubHomeBloc);
