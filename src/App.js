import "./App.css";
import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./screens/Home/home";
import Footer from "./components/footer";
import LeftSideComponent from "./components/Sidebar/LeftSideComponent";
import Article from "./screens/Ressource/article";
import Document from "./screens/Ressource/document";
import Indicateur from "./screens/Ressource/indicateur";
import styled from "styled-components";
import HOC from "./utils/hoc";
import OtherPage from "./screens/Other/otherPage";
import { useLocation } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { config } from "./config";
import { SecureRoute, Security, LoginCallback } from "@okta/okta-react";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { useHistory } from "react-router-dom";

const MainContainer = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.isMobile ? "column" : "row")};
`;
const BodyContainer = styled.div`
  width: ${(props) => (props.isMobile ? "calc(100%)" : "calc(100% - 266px)")};
`;

const oktaAuth = new OktaAuth({
  issuer: "https://rec-connect.croix-rouge.fr/oauth2/default",
  clientId: "0oa3e1vqpgyuzhUj90x7",
  redirectUri: "https://rec-connect.croix-rouge.fr/",
});

function App(props) {
  const isMobile = useMediaQuery(`(max-width:${config.breakPoint})`);
  const location = useLocation();
  let history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri || "/", window.location.origin));
  };

  return (
    <div className="App">
      <MainContainer isMobile={isMobile}>
        <LeftSideComponent className="sidebar" />
        <BodyContainer isMobile={isMobile}>
          <Switch>
            <Security
              oktaAuth={oktaAuth}
              restoreOriginalUri={restoreOriginalUri}
            >
              <Route exact path="/" component={HOC(Home)} />
              <Route exact path="/home" component={HOC(Home)} />
              <Route
                exact
                path="/indicateurs/:id"
                component={HOC(Indicateur)}
              />
              <Route
                exact
                path="/domaine-impact/:id"
                component={HOC(Indicateur)}
              />
              <Route exact path="/articles/:id" component={HOC(Article)} />
              <Route exact path="/documents/:id" component={HOC(Document)} />
              <Route exact path="/:id" component={HOC(OtherPage)} />
            </Security>
          </Switch>
          <Footer />
        </BodyContainer>
      </MainContainer>
    </div>
  );
}

export default App;
