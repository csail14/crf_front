import React from "react";
import { connect } from "react-redux";

import { BsChevronDown } from "react-icons/bs";
import styled from "styled-components";

import { colors } from "../../colors";

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 22px;
  line-height: 20px;
  border-right: 0.5px solid ${colors.gris};
  position: relative;
`;

const FilterTitle = styled.div`
  font-weight: 700;
  font-size: 12px;
  color: ${colors.gris};
  text-align: left;
  text-transform: uppercase;
`;

const FilterContent = styled.div`
  font-weight: 500;
  font-size: 16px;
  color: ${colors.marine};
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: -webkit-fill-available;
  cursor: pointer;
`;

const FilterOptionsContainer = styled.div`
  font-size: 16px;
  line-height: 21px;
  text-align: left;
  position: absolute;
  top: 60px;
  left: 0px;
  box-shadow: 0px 26px 70px rgba(0, 0, 0, 0.15);
  z-index: 1;
  display: flex;
  flex-direction: column;
  width: max-content;
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
    <FilterContainer>
      <FilterTitle>{props.title}</FilterTitle>
      <FilterContent onClick={props.toggleOptions}>
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
