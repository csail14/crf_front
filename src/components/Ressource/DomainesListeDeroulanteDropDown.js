import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { colors } from "../../colors";
import { MdArrowForwardIos } from "react-icons/md";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
const DomaineTitle = styled.div`
  font-weight: ${(props) => (props.isOpen ? "700" : "500")};
  font-size: 14px;
  text-transform: uppercase;
  text-align: left;
  color: ${(props) => (props.isOpen ? colors.rouge : colors.marine)};
  &:hover {
    opacity: 0.8;
    transition: opacity 150ms linear, transform 150ms linear;
    transform: scale(0.98);
  }
`;

const DomaineContainer = styled.div`
  display: flex;
  padding: 15px 30px;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  background-color: ${(props) => (props.isOpen ? colors.grisBackground : "")};
`;
const RessourcesLieesContainer = styled.div`
  font-weight: ${(props) => (props.isThisRessourceOpen ? "700" : "400")};
  color: ${(props) => (props.isThisRessourceOpen ? colors.rouge : colors.gris)};
  display: flex;
  padding: 15px 10px 15px 50px;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  text-align: left;
  &:hover {
    opacity: 0.8;
    transition: opacity 150ms linear, transform 150ms linear;
    transform: scale(0.98);
  }
`;
const DomaineListDeroulanteDropDown = (props) => {
  const [isOpen, setIsOpen] = useState(props.openID === props.info.id);
  let history = useHistory();
  useEffect(() => {
    setIsOpen(props.openID === props.info.id);
  }, [props.openID]);
  useEffect(() => {
    if (
      (props.info &&
        props.info.acf &&
        props.info.acf.ressources_liees &&
        props.info.acf.ressources_liees.length &&
        props.info.acf.ressources_liees.filter(
          (item) => item.post_name === props.slug
        ).length > 0) ||
      props.slug === props.info.slug
    ) {
      setIsOpen(true);
      props.setOpenId(props.info.id);
    }
  }, []);

  return (
    <>
      <DomaineContainer
        isOpen={isOpen}
        onClick={() => {
          props.openCloseDropDown(props.info.id);
          history.push({
            pathname: "/domaine-impact/" + props.info.slug,
            state: { id: props.info.id },
          });
        }}
      >
        <DomaineTitle isOpen={isOpen}>{props.info.name}</DomaineTitle>{" "}
        {isOpen ? "" : <MdArrowForwardIos />}
      </DomaineContainer>
      {isOpen &&
        props.info &&
        props.info.acf &&
        props.info.acf.ressources_liees &&
        props.info.acf.ressources_liees.map((item, index) => {
          const isThisRessourceOpen =
            item.ID == parseInt(props.indicateurId) ? true : false;
          if (item.post_type === "indicateurs") {
            return (
              <RessourcesLieesContainer
                key={index}
                onClick={() => {
                  history.push({
                    pathname: "/" + item.post_type + "/" + item.post_name,
                    state: { id: item.ID },
                  });
                }}
                isThisRessourceOpen={isThisRessourceOpen}
              >
                {item.post_title}
              </RessourcesLieesContainer>
            );
          }
        })}
    </>
  );
};

const mapDispatchToProps = {};

const mapStateToProps = (store) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DomaineListDeroulanteDropDown);
