import "./App.css";
import { Switch, Route } from "react-router-dom";
import Home from "./screens/Home/home";
import SubHome from "./screens/SubHome/subHome";
import Footer from "./components/footer";
import ImpactTrack from "./screens/ImpactTrack/impactTrack";
import LeftSideComponent from "./components/LeftSideComponent";
import Recherche from "./screens/Recherche/recherche";
import Contact from "./screens/Contact/contact";
import Article from "./screens/Ressource/article";
import Document from "./screens/Ressource/document";
import Indicateur from "./screens/Ressource/indicateur";
import styled from "styled-components";

const MainContainer = styled.div`
  display: flex;
`;

function App() {
  return (
    <div className="App">
      <MainContainer>
        <LeftSideComponent />
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/subHome" component={SubHome} />
            <Route exact path="/recherche" component={Recherche} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/impactTrack" component={ImpactTrack} />
            <Route exact path="/article/:id" component={Article} />
            <Route exact path="/document/:id" component={Document} />
            <Route exact path="/indicateur/:id" component={Indicateur} />
          </Switch>
          <Footer />
        </div>
      </MainContainer>
    </div>
  );
}

export default App;
