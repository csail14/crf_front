/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import {
  getAllSidebarPages,
  getAllTags,
  getAllDomainesActions,
  getAllDomainesImpacts,
  getAllOptions,
  getFooterMenu,
  getAllCategories,
} from "./api/API";

import { getAllPages } from "./api/RessourcesApi";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  loadPagesInfo,
  loadSidebarInfo,
  loadOptionsInfo,
} from "../actions/pages/pagesActions";
import { loadTaxoInfo } from "../actions/Taxonomie/taxonomieActions";

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
      this.checkOptions(this.props.options);
      if (true) {
        try {
        } catch (error) {
          console.log("error ?");
        }
      }
    };

    checkSidebarPages = (sidebarPages) => {
      getAllSidebarPages().then((res) => {
        this.props.loadSidebarInfo(res);
      });
    };

    checkOptions = (options) => {
      if (options.options.length === 0) {
        getAllOptions().then((res) =>
          getFooterMenu().then((FooterRes) =>
            this.props.loadOptionsInfo(res, FooterRes)
          )
        );
      }
    };

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
      let categories = taxonomie.categories;

      if (taxonomie.tags.length === 0) {
        tags = await getAllTags();
      }
      if (taxonomie.domainesActions.length === 0) {
        domainesActions = await getAllDomainesActions();
      }
      if (taxonomie.domainesImpacts.length === 0) {
        domainesImpacts = await getAllDomainesImpacts();
      }
      if (taxonomie.categories.length === 0) {
        categories = await getAllCategories();
      }
      this.props.loadTaxoInfo(
        tags,
        domainesActions,
        domainesImpacts,
        categories
      );
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
    loadOptionsInfo,
    loadSidebarInfo,
    loadTaxoInfo,
  };

  const mapStateToProps = (store) => {
    return {
      pages: store.pages,
      sidebarPages: store.sidebarPages,
      options: store.options,
      taxonomie: store.taxonomie,
    };
  };

  return connect(mapStateToProps, mapDispatchToProps)(RequireAuth);
}
