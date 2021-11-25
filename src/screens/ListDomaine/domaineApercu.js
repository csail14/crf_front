import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { MdArrowForwardIos } from "react-icons/md";
import { BsFillTriangleFill } from "react-icons/bs";
import { colors } from "../../colors";
import { useHistory } from "react-router-dom";
import DOMPurify from "dompurify";

const LinkContainer = styled.div`
  position: relative;
  display: flex;
  box-shadow: 0px 4px 8px rgba(35, 45, 66, 0.05);
  padding: 22px 30px;
  color: ${colors.marine};
  font-weight: 600;
  align-items: center;
  justify-content: space-between;
  background-color: ${colors.grisBackground};
  cursor: pointer;
  min-width: 175px;
  margin 10px 8px 10px 8px;
  &:hover {
    box-shadow: 12px 16px 35px 0px rgba(0, 0, 0, 0.3);
    transition: box-shadow 150ms linear, background-color 150ms linear,
      transform 150ms linear;
    transform: scale(0.98);
    Z-index:1;
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
  top: 70px;
  right: 50px;
  box-shadow: 0px 26px 70px rgba(0, 0, 0, 0.15);
  z-index: 2;
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

const ApercuDomaine = (props) => {
  const [hoverRef, isHovered] = useHover();
  let history = useHistory();

  return (
    <LinkContainer
      ref={hoverRef}
      onClick={() =>
        history.push({
          pathname: "/domaine-impact/" + props.info.slug,
          state: { id: props.info.id },
        })
      }
    >
      {props.info.name}

      <MdArrowForwardIos style={{ color: colors.marine }} />
      {isHovered && props.info.description !== "" && (
        <>
          <BsFillTriangleFill
            style={{ position: "absolute", right: "70px", bottom: "-10px" }}
          />
          <ExtraitContainer
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(props.info && props.info.description),
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
export default connect(mapStateToProps, mapDispatchToProps)(ApercuDomaine);
