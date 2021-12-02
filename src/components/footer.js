import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import { colors } from "../colors";

const MainContainer = styled.footer`
  padding: 18px 1%;
  background-color: ${colors.grisBackground};
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
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
      <MainContainer className="footer">
        <FooterLinkContainer>
          {menu &&
            menu.length > 0 &&
            menu.map((item, index) => {
              if (item.classes && item.classes[0] === "ot-sdk-show-settings") {
                return (
                  <a
                    key={index}
                    href={item.url}
                    id="ot-sdk-btn"
                    className="ot-sdk-show-settings cliquable_link"
                  >
                    {" "}
                    {item.title}
                  </a>
                );
              }
              const defineUrl = (long_url, type, slug) => {
                const url = long_url.replace(process.env.REACT_APP_WP_LINK, "");
                if (type === "page") {
                  return "/" + slug;
                } else if (type === "article") {
                  return "/articles/" + slug;
                } else if (type === "document") {
                  return "/documents/" + slug;
                } else if (type === "indicateur") {
                  return "/indicateurs/" + slug;
                } else return url;
              };
              const url = defineUrl(item.url, item.object, item.slug);
              return (
                <Link className="cliquable_link" key={index} to={url}>
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
