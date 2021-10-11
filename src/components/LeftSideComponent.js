import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

const LeftSideComponent = (props) => {
  return <div>LeftSideComponent</div>;
};

const mapDispatchToProps = {};

const mapStateToProps = (store) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(LeftSideComponent);
