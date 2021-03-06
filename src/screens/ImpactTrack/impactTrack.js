import React from "react";
import { connect } from "react-redux";

const ImpactTrack = (props) => {
  const slug = props.slug || "impact-track";
  const template =
    props.pages && props.pages.templates && props.pages.templates.length
      ? props.pages.templates.filter((template) => template.slug === slug)[0]
      : null;
  const url = template && template.acf && template.acf.lien_impact_track;
  return (
    <iframe
      id="impact-track"
      title="Impact-track"
      width="100%"
      height="100%"
      src={url}
    ></iframe>
  );
};

const mapDispatchToProps = {};

const mapStateToProps = (store) => {
  return { pages: store.pages };
};

export default connect(mapStateToProps, mapDispatchToProps)(ImpactTrack);
