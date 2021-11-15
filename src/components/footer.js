import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import styled from "styled-components";
import { colors } from "../colors";

const MainContainer = styled.div`
  padding: 18px;
  background-color: ${colors.grisBackground};
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  line-height: 19px;
`;

const FooterLinkContainer = styled.div``;
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
              const url = item.url.replace(
                "https://pmis-wp.laguildedupixel.fr",
                ""
              );
              return (
                <Link
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
