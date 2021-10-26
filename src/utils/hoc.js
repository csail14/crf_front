/* eslint-disable import/no-anonymous-default-export */
import React, { useState, useEffect } from "react";
import { getAllPages, getAllSidebarPages,  getAllTags,
  getAllDomainesActions,
  getAllDomainesImpacts, } from "./api/API";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { loadPagesInfo, loadSidebarInfo } from "../actions/pages/pagesActions";
import { loadTaxoInfo } from "../actions/taxonomie/taxonomieActions";


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
      this.checkSidebarPages(this.props.sidebarPages);
            this.checkTaxo(this.props.taxonomie);
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

    checkTaxo = async (taxonomie) => {
      let tags = taxonomie.tags;
      let domainesActions = taxonomie.domainesActions;
      let domainesImpacts = taxonomie.domainesImpacts;

      if (taxonomie.tags.length === 0) {
        tags = await getAllTags();
      }
      if (taxonomie.domainesActions.length === 0) {
        domainesActions = await getAllDomainesActions();
      }
      if (taxonomie.domainesImpacts.length === 0) {
        domainesImpacts = await getAllDomainesImpacts();
      }
      this.props.loadTaxoInfo(tags, domainesActions, domainesImpacts);
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

    loadSidebarInfo,

    loadTaxoInfo,

  };

  const mapStateToProps = (store) => {
    return {
      pages: store.pages,

      sidebarPages: store.sidebarPages,

      taxonomie: store.taxonomie,

    };
  };

  return connect(mapStateToProps, mapDispatchToProps)(RequireAuth);
}
