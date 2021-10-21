/* eslint-disable import/no-anonymous-default-export */
import React, { useState, useEffect } from "react";
import { getAllPages } from "./api/API";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

export default function (ChildComponent, withAuth = false) {
  class RequireAuth extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        redirect: false,
        redirectNoAdmin: false,
      };
    }

    componentDidMount = async () => {
      this.checkPages(this.props.pages);
      if (true) {
        try {
          console.log("props", this.props);
        } catch (error) {
          console.log("error ?");
        }
      }
    };

    checkPages = (pages) => {
      if (pages.length === 0) {
        getAllPages().then((res) => console.log("pages", res));
      }
    };

    render() {
      if (this.state.redirect && withAuth) {
        return <Redirect to="/login" />;
      }

      return <ChildComponent {...this.props} />;
    }
  }

  const mapDispatchToProps = {};

  const mapStateToProps = (store) => {
    return {
      pages: store.pages,
    };
  };

  return connect(mapStateToProps, mapDispatchToProps)(RequireAuth);
}
