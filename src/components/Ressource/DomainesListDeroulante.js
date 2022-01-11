import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { colors } from "../../colors";
import DomaineListDeroulanteDropDown from "./DomainesListeDeroulanteDropDown";

const ListDomainContainer = styled.div`
  display: flex;
  background: #ffffff;
  height: fit-content;
  box-shadow: 0px 26px 70px rgba(0, 0, 0, 0.15);
  justify-content: flex-start;
  flex-direction: column;
`;
const DomainesMainTitle = styled.h2`
  margin: 0;
  font-weight: bold;
  font-size: 1.5rem;
  line-height: 130%;
  letter-spacing: 0.1rem;
  padding: 40px 11% 20px;
  text-transform: uppercase;
  color: ${colors.marine};
  @media screen and (max-width: 1024px) {
    padding: 20px 5%;
  }
`;
const DomaineListDeroulante = (props) => {
  const [openID, setOpenId] = useState(null);

  const openCloseDropDown = (id) => {
    if (id === openID) {
      setOpenId(null);
    } else {
      setOpenId(id);
    }
  };
  const domaineImpacts = props.taxonomie && props.taxonomie.domainesImpacts;
  return (
    <ListDomainContainer>
      <DomainesMainTitle>Les domaines d’impact</DomainesMainTitle>
      {domaineImpacts &&
        domaineImpacts.map((item, index) => {
          if (item.indicateurs.length > 0) {
            return (
              <DomaineListDeroulanteDropDown
                indicateurId={props.id}
                slug={props.slug}
                info={item}
                key={index}
                openID={openID}
                setOpenId={setOpenId}
                openCloseDropDown={openCloseDropDown}
              />
            );
          }
          return null;
        })}
    </ListDomainContainer>
  );
};

const mapDispatchToProps = {};

const mapStateToProps = (store) => {
  return { taxonomie: store.taxonomie };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DomaineListDeroulante);
