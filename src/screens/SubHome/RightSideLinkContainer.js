import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { MdArrowForwardIos } from "react-icons/md";
import { BsFillTriangleFill } from "react-icons/bs";
import { colors } from "../../colors";
import { useHistory } from "react-router-dom";
import DOMPurify from "dompurify";
import { getRessourceById } from "../../utils/api/RessourcesApi";
require("moment/locale/fr.js");

const LinkContainer = styled.div`
  position: relative;
  display: flex;
  box-shadow: 0px 4px 8px rgba(35, 45, 66, 0.05);
  padding: 15px 20px;
  color: ${colors.marine};
  font-weight: 600;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  min-width: 300px;
  margin-bottom: 10px;
`;

const ExtraitContainer = styled.div`
  background-color: ${colors.marine};
  padding: 15px 20px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  line-height: 21px;
  text-align: left;
  position: absolute;
  bottom: -80px;
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
  const [details, setDetails] = useState(null);
  const [hoverRef, isHovered] = useHover();
  let history = useHistory();
  useEffect(() => {
    if (props.info) {
      getRessourceById(
        props.info.ID,
        props.info.post_type === "post" ? "posts" : props.info.post_type
      )
        .then((res) => setDetails(res))
        .catch((error) => console.log(error));
    }
  }, [props.info]);
  const url = "/" + props.info.post_type + "/" + props.info.ID;
  return (
    <LinkContainer ref={hoverRef} onClick={() => history.push(url)}>
      {props.info.post_title}
      <MdArrowForwardIos style={{ color: colors.rouge }} />
      {isHovered && (
        <>
          <BsFillTriangleFill
            style={{ position: "absolute", right: "70px", bottom: "-3px" }}
          />
          <ExtraitContainer
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                details && details.acf && details.acf.extrait
              ),
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
