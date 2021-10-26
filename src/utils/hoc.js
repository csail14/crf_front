/* eslint-disable import/no-anonymous-default-export */
import React, { useState, useEffect } from "react";
import { getAllPages, getAllSidebarPages } from "./api/API";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { loadPagesInfo, loadSidebarInfo } from "../actions/pages/pagesActions";
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
      this.checkSidebarPages(this.props.sidebarPages)
      if (true) {
        try {
        } catch (error) {
          console.log("error ?");
        }
      }
    };

    checkSidebarPages = (sidebarPages) => {
      getAllSidebarPages().then((res) => {
        this.props.loadSidebarInfo(res)
      })
    }

    checkPages = (pages) => {
      if (pages.templates.length === 0) {
        getAllPages().then((res) => {
          this.props.loadPagesInfo(res);
        });
      }
    };

    render() {
      if (this.state.redirect && withAuth) {
        return <Redirect to="/login" />;
      }

      return <ChildComponent {...this.props} />;
    }
  }

  const mapDispatchToProps = {
    loadPagesInfo,
    loadSidebarInfo
  };

  const mapStateToProps = (store) => {
    return {
      pages: store.pages,
      sidebarPages: store.sidebarPages
    };
  };

  return connect(mapStateToProps, mapDispatchToProps)(RequireAuth);
}
