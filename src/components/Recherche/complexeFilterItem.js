import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { GoSearch } from "react-icons/go";
import { BsChevronDown } from "react-icons/bs";
import styled from "styled-components";
import FilterOptions from "./filterOptionsItem";
import { colors } from "../../colors";
import useMediaQuery from "@mui/material/useMediaQuery";
import { config } from "../../config";
const FilterContainer = styled.div`
  display: flex;
  margin: ${(props) => (props.isMobile ? "5px auto" : "")};
  background-color: ${(props) => (props.isMobile ? "white" : "")};
  flex-direction: column;
  padding: ${(props) => (props.isTop ? "5px 10px" : "0 9%")};
  line-height: 20px;
  border-right: ${(props) => (props.isMobile ? "" : "1px solid #E2E3E5")};
  @media screen and (max-width: 1024px) {
    padding: 5px 5%;
    position: relative;
  }
`;

const FilterTitle = styled.div`
  font-weight: 700;
  font-size: 1.2rem;
  color: ${colors.gris};
  text-transform: uppercase;
  @media screen and (max-width: 1024px) {
    font-size: 1rem;
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
  @media screen and (max-width: 1024px) {
    font-size: 1.4rem;
  }
`;

const KeyWordsContainer = styled.div`
  display: flex;
  padding: 9px 5px;
  align-items: center;
  color: ${colors.gris};
  font-weight: 500;
  background-color: ${colors.grisBackground};
  width: fit-content;
  @media screen and (max-width: 1024px) {
    margin-bottom: 20px;
  }
`;

const FilterOptionsContainer = styled.div`
  box-shadow: 0px 26px 70px rgba(0, 0, 0, 0.15);
  background-color: white;
  flex-wrap: wrap;
  z-index: 1;
  padding: 30px 50px;
  font-size: 1.6rem;
  line-height: 21px;
  position: absolute;
  top: 80px;
  left: 0px;
  box-shadow: 0px 26px 70px rgba(0, 0, 0, 0.15);
  z-index: 1;
  @media screen and (max-width: 1024px) {
    padding: 20px 15px;
    top: 50px;
    font-size: 1.4rem;
  }
`;

const NumberSelected = styled.div`
  color: ${colors.rouge};
  margin-right: 5px;
`;

const ComplexeFilterItem = (props) => {
  const [keyValue, setKeyValue] = useState("");
  const [searchItem, setSearchItem] = useState(props.data);
  const isMobile = useMediaQuery(`(max-width:${config.breakPoint})`);

  useEffect(() => {
    if (keyValue !== "") {
      const filtreSearchItem = (value) => {
        let array = [];
        props.data.forEach((item) => array.push(item));
        return array.filter((item) =>
          item.name.toLowerCase().includes(value.toLowerCase())
        );
      };
      const newArray = filtreSearchItem(keyValue);
      setSearchItem(newArray);
    } else {
      setSearchItem(props.data);
    }
  }, [keyValue, props.data]);

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
      //   props.toggleOptions(false);
    }
  };

  const handleChange = (e) => {
    setKeyValue(e.target.value);
  };
  return (
    <FilterContainer isMobile={isMobile} isTop={props.isTop}>
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
          <KeyWordsContainer>
            <input
              type="text"
              className="recherche_domaine_input"
              placeholder={"Rechercher un " + props.title}
              onChange={handleChange}
            />{" "}
            <GoSearch style={{ marginRight: "12px" }} />
          </KeyWordsContainer>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {searchItem.map((item, index) => {
              let isSelected = props.selectedObject.indexOf(item) !== -1;
              if (item.count > 0) {
                return (
                  <FilterOptions
                    isSelected={isSelected}
                    manageSelectedFilter={manageSelectedFilter}
                    key={index}
                    item={item}
                  />
                );
              }
              return null;
            })}
          </div>
        </FilterOptionsContainer>
      )}
    </FilterContainer>
  );
};

const mapDispatchToProps = {};

const mapStateToProps = (store) => {
  return { taxonomie: store.taxonomie };
};

export default connect(mapStateToProps, mapDispatchToProps)(ComplexeFilterItem);
