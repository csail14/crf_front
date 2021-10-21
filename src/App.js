import "./App.css";
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

const MainContainer = styled.div`
  display: flex;
`;
const BodyContainer = styled.div`
  width: -webkit-fill-available;
`;
function App() {
  return (
    <div className="App">
      <MainContainer>
        <LeftSideComponent className="sidebar" />
        <BodyContainer>
          <Switch>
            <Route exact path="/" component={HOC(Home)} />
            <Route exact path="/home" component={HOC(Home)} />
            <Route exact path="/subHome" component={HOC(SubHome)} />
            <Route exact path="/recherche" component={HOC(Recherche)} />
            <Route exact path="/contact" component={HOC(Contact)} />
            <Route exact path="/impactTrack" component={HOC(ImpactTrack)} />
            <Route exact path="/article/:id" component={HOC(Article)} />
            <Route exact path="/document/:id" component={HOC(Document)} />
            <Route exact path="/indicateur/:id" component={HOC(Indicateur)} />
          </Switch>
          <Footer />
        </BodyContainer>
      </MainContainer>
    </div>
  );
}

export default App;
