import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { colors } from "../../colors";
import { MdArrowForwardIos } from "react-icons/md";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useHistory } from "react-router-dom";
import { config } from "../../config";
const MainContainer = styled.div`
  margin: ${(props) => (props.isMobile ? "50px 35px 10px 35px" : "0px 0px")};
  flex-basis: 30%;
  display: flex;
  flex-direction: column;
  a:last-of-type {
    margin-top: auto;
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
`;

const TitleContainer = styled.h2`
  color: ${colors.rouge};
  margin: 53px 0 0;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 2.6rem;
  letter-spacing: 0.3rem;
`;

const SubTitleContainer = styled.p`
  color: ${colors.marine};
  margin: 5px 0 0;
  font-size: 1.6rem;
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
              src={props.info.push.image ? props.info.push.image.url : null}
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
              if (item.post_status === "publish")
                return (
                  <LinkContainer
                    key={index}
                    onClick={() => {
                      !props.isSearchOpen
                        ? history.push({
                            pathname:
                              "/" + item.post_type + "/" + item.post_name,
                            state: { id: item.ID },
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
      <Link to={link}>
        <MoreInfoContainer>
          <Text>
            En savoir plus{" "}
            <MdArrowForwardIos
              style={{ color: colors.rouge, marginLeft: "10px" }}
            />{" "}
          </Text>
        </MoreInfoContainer>
      </Link>
    </MainContainer>
  );
};

const mapDispatchToProps = {};

const mapStateToProps = (store) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SubHomeBloc);
