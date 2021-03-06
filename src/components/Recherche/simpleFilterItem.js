import React from "react";
import { connect } from "react-redux";

import { BsChevronDown } from "react-icons/bs";
import styled from "styled-components";
import useMediaQuery from "@mui/material/useMediaQuery";
import { config } from "../../config";
import { colors } from "../../colors";

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: ${(props) => (props.isMobile ? "5px auto" : "")};
  background-color: ${(props) => (props.isMobile ? "white" : "")};
  padding: ${(props) => (props.isTop ? "5px 10px" : "0px 9%")};
  line-height: 20px;
  border-right: ${(props) =>
    props.isMobile || props.isType ? "" : "1px solid #E2E3E5"};
  position: relative;
  @media screen and (max-width:1024px){
    padding:5px 5%;
  }
`;

const FilterTitle = styled.div`
  font-weight: 700;
  font-size:1.2rem;
  color: ${colors.gris};
  text-transform: uppercase;
  @media screen and (max-width:1024px){
    font-size:1rem;
  }
`;

const FilterContent = styled.div`
  font-weight: 500;
  font-size: 1.6rem;
  color: ${colors.marine};
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: -webkit-fill-available;
  cursor: pointer;
  transition: opacity 150ms linear, transform 150ms linear;
  &:hover {
    opacity: 0.8;
    transform: scale(0.98);
  }
  @media screen and (max-width:1024px){
    font-size:1.4rem;
  }
`;

const FilterOptionsContainer = styled.div`
  font-size: 1.6rem;
  line-height: 21px;
  position: absolute;
  top: 60px;
  left: 0px;
  box-shadow: 0px 26px 70px rgba(0, 0, 0, 0.15);
  z-index: 1;
  display: flex;
  flex-direction: column;
  width: max-content;
  @media screen and (max-width:1024px){
    top:50px;
  }
`;
const FilterOptions = styled.div`
  background-color: ${(props) => (props.isSelected ? colors.marine : "white")};
  color: ${(props) => (props.isSelected ? "white" : colors.gris)};
  display: flex;
  justify-content: space-between;
  padding: 15px 20px;
  flex-wrap: no-wrap;
`;

const NumberSelected = styled.div`
  color: ${colors.rouge};
  margin-right: 5px;
`;

const SimpleFilterItem = (props) => {
  const isMobile = useMediaQuery(`(max-width:${config.breakPoint})`);
  const manageSelectedFilter = (item) => {
    if (item.id === 0) {
      props.setSelectedObject([]);
      props.toggleOptions(false);
    } else {
      let index = props.selectedObject.indexOf(item);
      let array = [];
      props.selectedObject.forEach((item) => array.push(item));
      if (index !== -1) {
        array.splice(index, 1);
      } else {
        array.push(item);
      }
      props.setSelectedObject(array);
      //props.toggleOptions(false);
    }
  };

  return (
    <FilterContainer
      isType={props.isType}
      isMobile={isMobile}
      isTop={props.isTop}
    >
      <FilterTitle isTop={props.isTop}>{props.title}</FilterTitle>
      <FilterContent isTop={props.isTop} onClick={props.toggleOptions}>
        {props.selectedObject.length > 1 ? (
          <>
            <NumberSelected>({props.selectedObject.length})</NumberSelected>
            Modifier
          </>
        ) : props.selectedObject.length === 1 ? (
          props.selectedObject[0].name
        ) : (
          props.default
        )}
        <BsChevronDown style={{ marginLeft: "10px" }} />
      </FilterContent>
      {props.showOptions && (
        <FilterOptionsContainer>
          {props.data.map((item, index) => {
            let isSelected = props.selectedObject.indexOf(item) !== -1;

            return (
              <FilterOptions
                isSelected={isSelected}
                onClick={() => manageSelectedFilter(item)}
                className="search_options"
                key={index}
                data-name={item.taxonomy}
              >
                {item.name}{" "}
                <i style={{ marginLeft: "10px" }} className={item.icon}></i>
              </FilterOptions>
            );
          })}
        </FilterOptionsContainer>
      )}
    </FilterContainer>
  );
};

const mapDispatchToProps = {};

const mapStateToProps = (store) => {
  return { taxonomie: store.taxonomie };
};

export default connect(mapStateToProps, mapDispatchToProps)(SimpleFilterItem);
