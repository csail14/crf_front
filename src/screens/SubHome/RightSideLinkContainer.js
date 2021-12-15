import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { MdArrowForwardIos } from "react-icons/md";
import { BsFillTriangleFill } from "react-icons/bs";
import { colors } from "../../colors";
import { useHistory } from "react-router-dom";
import DOMPurify from "dompurify";
import { getRessourceById } from "../../utils/api/RessourcesApi";
import { config } from "../../config";
import useMediaQuery from "@mui/material/useMediaQuery";
require("moment/locale/fr.js");

const LinkContainer = styled.h3`
  position: relative;
  display: flex;
  box-shadow: 0px 4px 8px rgba(35, 45, 66, 0.05);
  padding: 13px 20px;
  line-height: 1.5;
  color: ${colors.marine};
  font-weight: 600;
  font-size: 1.6rem;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  margin: 11px 0;
  transition: box-shadow 150ms linear, background-color 150ms linear,
    transform 150ms linear;
  &:hover {
    box-shadow: 6px 8px 15px 0px rgba(0, 0, 0, 0.2);
    transform: scale(0.98);
  }
`;

const ExtraitContainer = styled.div`
  background-color: ${colors.marine};
  padding: 15px 20px;
  color: white;
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 21px;
  position: absolute;
  top: 80px;
  right: 50px;
  box-shadow: 0px 26px 70px rgba(0, 0, 0, 0.15);
  z-index: 1;
`;

function useHover() {
  const [value, setValue] = useState(false);
  const ref = useRef(null);
  const handleMouseOver = () => setValue(true);
  const handleMouseOut = () => setValue(false);

  useEffect(
    () => {
      const node = ref.current;
      if (node) {
        node.addEventListener("mouseover", handleMouseOver);
        node.addEventListener("mouseout", handleMouseOut);
        return () => {
          node.removeEventListener("mouseover", handleMouseOver);
          node.removeEventListener("mouseout", handleMouseOut);
        };
      }
    },
    [ref.current] // Recall only if ref changes
  );
  return [ref, value];
}

const RightSideLinkContainer = (props) => {
  const isMobile = useMediaQuery(`(max-width:${config.breakPoint})`);

  const [hoverRef, isHovered] = useHover();
  let history = useHistory();

  const url = "/" + props.info.link;
  console.log(props.info.link);
  return (
    <LinkContainer
      isMobile={isMobile}
      ref={hoverRef}
      onClick={() =>
        history.push({
          pathname: url,
          state: { id: props.info.id },
        })
      }
    >
      {props.info.title && props.info.title.rendered}
      <MdArrowForwardIos style={{ color: colors.rouge }} />
      {isHovered && props.info && props.info.excerpt && (
        <>
          <BsFillTriangleFill
            style={{ position: "absolute", right: "70px", top: "68px" }}
          />
          <ExtraitContainer
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(props.info.excerpt),
            }}
          ></ExtraitContainer>
        </>
      )}
    </LinkContainer>
  );
};

const mapDispatchToProps = {};

const mapStateToProps = (store) => {
  return {};
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RightSideLinkContainer);
