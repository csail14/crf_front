import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

const Home = (props) => {
  return <div>Coucou</div>;
};

const mapDispatchToProps = {};

const mapStateToProps = (store) => {
  return {
    user: store.user,
    theme: store.theme,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
