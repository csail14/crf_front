import React, { useState } from "react";
import { connect } from "react-redux";
import SearchBar from "../../components/Recherche/searchBar";
import styled from "styled-components";
import SubHomeBloc from "./subHomeBloc";
import { colors } from "../../colors";
import DOMPurify from "dompurify";
import { config } from "../../config";
import useMediaQuery from "@mui/material/useMediaQuery";

const MainContainer = styled.div`
  min-height: 100vh;
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

const Home = (props) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const homeTemplate = props.pages.templates.length
    ? props.pages.templates.filter((template) => template.slug === "accueil")[0]
    : null;

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFilterSeledted, setIsFilterSelected] = useState(false);

  const toggleIsSearchOpen = (isOpen) => {
    setIsSearchOpen(isOpen);
  };

  return (
    <MainContainer>
      <HeaderContainer isMobile={isMobile}>
        {homeTemplate && homeTemplate.title ? (
          <HeaderTitleContainer
            style={{ fontWeight: "700" }}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(homeTemplate.title.rendered),
            }}
          />
        ) : (
          <HeaderTitleContainer style={{ fontWeight: "700" }}>
            L'impact social des actions
          </HeaderTitleContainer>
        )}
        <HeaderTitleContainer>
          {" "}
          {homeTemplate
            ? homeTemplate.acf.sous_titre
            : "De la croix rouge française"}
        </HeaderTitleContainer>
        {homeTemplate && <SubtitleContainer></SubtitleContainer>}
      </HeaderContainer>
      {!isMobile && (
        <SearchBar
          setIsFilterSelected={setIsFilterSelected}
          setIsSearchOpen={toggleIsSearchOpen}
        />
      )}
      <BodyContainer isMobile={isMobile}>
        {homeTemplate
          ? homeTemplate.acf.entrees.map((item, index) => {
              return (
                <SubHomeBloc
                  isSearchOpen={isSearchOpen}
                  key={index}
                  info={item}
                />
              );
            })
          : null}
      </BodyContainer>
    </MainContainer>
  );
};

const mapDispatchToProps = {};

const mapStateToProps = (store) => {
  return {
    pages: store.pages,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
