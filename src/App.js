import "./App.css";
import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./screens/Home/home";
import SubHome from "./screens/SubHome/subHome";
import Footer from "./components/footer";
import ImpactTrack from "./screens/ImpactTrack/impactTrack";
import LeftSideComponent from "./components/Sidebar/LeftSideComponent";
import Recherche from "./screens/Recherche/recherche";
import Contact from "./screens/Contact/contact";
import Article from "./screens/Ressource/article";
import Document from "./screens/Ressource/document";
import Indicateur from "./screens/Ressource/indicateur";
import styled from "styled-components";
import HOC from "./utils/hoc";
import ListIndicateur from "./screens/ListIndicateur/listIndicateur";
import { useLocation } from "react-router-dom";

const MainContainer = styled.div`
  display: flex;
`;
const BodyContainer = styled.div`
  width: -webkit-fill-available;
`;
function App() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <div className="App">
      <MainContainer>
        <LeftSideComponent className="sidebar" />
        <BodyContainer>
          <Switch>
            <Route exact path="/" component={HOC(Home)} />
            <Route exact path="/home" component={HOC(Home)} />
            <Route exact path="/subHome/:id" component={HOC(SubHome)} />
            <Route exact path="/recherche" component={HOC(Recherche)} />
            <Route exact path="/contact" component={HOC(Contact)} />
            <Route exact path="/impactTrack" component={HOC(ImpactTrack)} />
            <Route exact path="/post/:id" component={HOC(Article)} />
            <Route exact path="/documents/:id" component={HOC(Document)} />
            <Route exact path="/indicateurs/:id" component={HOC(Indicateur)} />
            <Route
              exact
              path="/liste-des-indicateurs"
              component={HOC(ListIndicateur)}
            />
          </Switch>
          <Footer />
        </BodyContainer>
      </MainContainer>
    </div>
  );
}

export default App;
