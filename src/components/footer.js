import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import { colors } from "../colors";

const MainContainer = styled.footer`
  padding: 18px;
  background-color: ${colors.grisBackground};
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  line-height: 19px;
`;

const FooterLinkContainer = styled.nav``;
class Header extends React.Component {
  render() {
    const copyright =
      this.props.options &&
      this.props.options.options &&
      this.props.options.options.acf &&
      this.props.options.options.acf.copyright;
    const menu = this.props.options && this.props.options.footerMenu;
    return (
      <MainContainer>
        <FooterLinkContainer>
          {menu &&
            menu.map((item, index) => {
              const defineUrl = (long_url, type, slug) => {
                const url = long_url.replace(process.env.REACT_APP_WP_LINK, "");
                if (type === "page") {
                  return url;
                } else if (type === "articles") {
                  return "/articles/" + slug;
                } else if (type === "document") {
                  return "/documents/" + slug;
                } else if (type === "indicateur") {
                  return "/indicateurs/" + slug;
                } else return url;
              };
              const url = defineUrl(item.url, item.object, item.slug);
              return (
                <Link
                  className="cliquable_link"
                  key={index}
                  style={{ textDecoration: "none", marginRight: "10px" }}
                  to={url}
                >
                  {item.title}
                </Link>
              );
            })}
        </FooterLinkContainer>
        <div>{copyright}</div>
      </MainContainer>
    );
  }
}

const mapDispatchToProps = {};

const mapStateToProps = (store) => {
  return { options: store.options };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
