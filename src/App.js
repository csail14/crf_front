import "./App.css";
import { Switch, Route } from "react-router-dom";
import Home from "./screens/home";
import Header from "./components/header";
import Footer from "./components/footer";

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/home" component={Home} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
