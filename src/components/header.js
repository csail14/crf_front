import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <header className="header">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Link to="/home">Accueil</Link>
        </div>
      </header>
    );
  }
}

const mapDispatchToProps = {};

const mapStateToProps = (store) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
