import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { BsFillTriangleFill } from "react-icons/bs";
import styled from "styled-components";

import { colors } from "../../colors";

const FilterOptions = styled.div`
  background-color: ${(props) =>
    props.isSelected ? colors.marine : colors.grisBackground};
  color: ${(props) => (props.isSelected ? "white" : colors.gris)};
  display: flex;
  margin: 24px 24px 12px 0;
  justify-content: space-between;
  padding: 15px 20px;
  flex-wrap: no-wrap;
  position: relative;
`;

const ExtraitContainer = styled.div`
  background-color: ${colors.marine};
  padding: 15px 20px;
  color: white;
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 21px;
  text-align: left;
  position: absolute;
  top: 64px;
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

const SimpleFilterItem = (props) => {
  const [hoverRef, isHovered] = useHover();
  return (
    <FilterOptions
      ref={hoverRef}
      isSelected={props.isSelected}
      onClick={() => props.manageSelectedFilter(props.item)}
      className="search_options"
    >
      {props.item.name}
      <i style={{ marginLeft: "10px" }} className={props.item.icon}></i>
      {isHovered && props.item && props.item.description !== "" && (
        <>
          <BsFillTriangleFill
            style={{
              position: "absolute",
              right: "70px",
              top: "50px",
              color: colors.marine,
            }}
          />
          <ExtraitContainer>{props.item.description}</ExtraitContainer>
        </>
      )}
    </FilterOptions>
  );
};

const mapDispatchToProps = {};

const mapStateToProps = (store) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SimpleFilterItem);
