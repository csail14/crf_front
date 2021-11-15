import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { colors } from "../../colors";
import { MdArrowForwardIos } from "react-icons/md";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useHistory } from "react-router-dom";
const MainContainer = styled.div`
  margin: ${(props) => (props.isMobile ? "50px 35px 10px 35px" : "50px 35px")};
  max-width: 400px;
`;

const HeaderContainer = styled.div`
  display: flex;
  cursor: pointer;
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
  const isMobile = useMediaQuery("(max-width:600px)");

  const link = props.info.push.lien.replace(
    "https://pmis-wp.laguildedupixel.fr/",
    ""
  );
  let history = useHistory();
  return (
    <MainContainer isMobile={isMobile}>
      <Link
        // ACHANGER
        to={props.isSearchOpen ? "#" : "/" + link}
        style={{ textDecoration: "none" }}
      >
        <HeaderContainer>
          {" "}
          <img
            style={{ maxHeight: "130px", maxWidth: "220px" }}
            src={props.info.push.image ? props.info.push.image.url : null}
            alt="blocImage"
          />
          <TitleContainer>
            {props.info.push.titre ? props.info.push.titre : ""}
          </TitleContainer>
          <SubTitleContainer>
            {" "}
            {props.info.push.sous_titre ? props.info.push.sous_titre : ""}
          </SubTitleContainer>
        </HeaderContainer>
      </Link>
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
      <Link //ACHANGER
        to={"/" + link}
        style={{ textDecoration: "none" }}
      >
        <MoreInfoContainer>
          En savoir plus{" "}
          <MdArrowForwardIos
            style={{ color: colors.rouge, marginLeft: "10px" }}
          />
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
