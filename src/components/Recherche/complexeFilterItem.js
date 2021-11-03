import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { GoSearch } from "react-icons/go";
import { BsChevronDown } from "react-icons/bs";
import styled from "styled-components";
import FilterOptions from "./filterOptionsItem";
import { colors } from "../../colors";

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 22px;
  line-height: 20px;
  border-right: 0.5px solid ${colors.gris};
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

const KeyWordsContainer = styled.div`
  display: flex;
  padding: 9px 5px;
  align-items: center;
  padding-right: 15px;
  color: ${colors.gris};
  font-weight: 500;
  background-color: ${colors.grisBackground};
  width: fit-content;
`;

const FilterOptionsContainer = styled.div`
  box-shadow: 0px 26px 70px rgba(0, 0, 0, 0.15);
  background-color: white;
  flex-wrap: wrap;
  z-index: 1;
  padding: 30px 50px;
  font-size: 16px;
  line-height: 21px;
  text-align: left;
  position: absolute;
  top: 80px;
  left: 0px;
  box-shadow: 0px 26px 70px rgba(0, 0, 0, 0.15);
  z-index: 1;

  width: max-content;
`;

const NumberSelected = styled.div`
  color: ${colors.rouge};
  margin-right: 5px;
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
  const [keyValue, setKeyValue] = useState("");
  const [searchItem, setSearchItem] = useState(props.data);

  useEffect(() => {
    if (keyValue !== "") {
      const newArray = filtreSearchItem(keyValue);
      setSearchItem(newArray);
    } else {
      setSearchItem(props.data);
    }
  }, [keyValue, props.data]);

  const filtreSearchItem = (value) => {
    let array = [];
    props.data.forEach((item) => array.push(item));
    return array.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
  };

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
      props.toggleOptions(false);
    }
  };

  const handleChange = (e) => {
    setKeyValue(e.target.value);
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
          <KeyWordsContainer>
            <input
              type="text"
              className="recherche_domaine_input"
              placeholder={"Rechercher un domaine"}
              onChange={handleChange}
            />{" "}
            <GoSearch style={{ marginRight: "12px" }} />
          </KeyWordsContainer>
          <div style={{ display: "flex" }}>
            {searchItem.map((item, index) => {
              let isSelected = props.selectedObject.indexOf(item) !== -1;
              return (
                <FilterOptions
                  isSelected={isSelected}
                  manageSelectedFilter={manageSelectedFilter}
                  key={index}
                  item={item}
                />
              );
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

export default connect(mapStateToProps, mapDispatchToProps)(SimpleFilterItem);
