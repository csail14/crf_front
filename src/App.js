import "./App.css";
import React, { useEffect, useState } from "react";
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

const logout = async () => oktaAuth.signOut("/");

const oktaAuth = new OktaAuth({
  issuer: "https://rec-connect.croix-rouge.fr/oauth2/default",
  clientId: "0oa3e1vqpgyuzhUj90x7",
  redirectUri: window.location.origin + "/login/callback",
});

function getFaviconEl() {
  let element = document.getElementById("favicon");
  fetch("https://pmis-wp.laguildedupixel.fr/wp-json/wp/v2/options/favicon")
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((resp) => {
      element.rel = "icon";
      element.href = resp;
    })
    .catch((err) => {
      console.log(err);
    });
  return element;
}

function App(props) {
  const isMobile = useMediaQuery(`(max-width:${config.breakPoint})`);
  const [userInfo, setUserInfo] = useState(null);
  const location = useLocation();
  let history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    console.log("oktaAuth", oktaAuth);
    if (oktaAuth) {
      console.log("useEffet okta");
      const tokenManager = oktaAuth.token;
      console.log("tokenManager", tokenManager);
      oktaAuth.token.getUserInfo().then((info) => {
        setUserInfo(info);
      });
    }
  }, [oktaAuth]);

  console.log("userInfo", userInfo);

  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri || "/", window.location.origin));
  };
  getFaviconEl();

  return (
    <div className="App">
      <MainContainer isMobile={isMobile}>
        <LeftSideComponent className="sidebar" logout={logout} />
        <BodyContainer isMobile={isMobile}>
          <Switch>
            <Security
              oktaAuth={oktaAuth}
              restoreOriginalUri={restoreOriginalUri}
            >
              <SecureRoute exact path="/" component={HOC(Home)} />
              <SecureRoute exact path="/home" component={HOC(Home)} />
              <SecureRoute
                exact
                path="/indicateurs/:id"
                component={HOC(Indicateur)}
              />
              <SecureRoute
                exact
                path="/domaine-impact/:id"
                component={HOC(Indicateur)}
              />
              <SecureRoute
                exact
                path="/articles/:id"
                component={HOC(Article)}
              />
              <SecureRoute
                exact
                path="/documents/:id"
                component={HOC(Document)}
              />
              <SecureRoute exact path="/:id" component={HOC(OtherPage)} />
              {/* <Route exact path="/" component={HOC(Home)} />
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
              <Route exact path="/:id" component={HOC(OtherPage)} /> */}
            </Security>
          </Switch>
          <Footer />
        </BodyContainer>
      </MainContainer>
    </div>
  );
}

export default App;
