import React from "react";
import PropTypes from "prop-types";

const Content = ({ children }) => {
  return <div className="content-container ">{children}</div>;
};

Content.propTypes = {
  children: PropTypes.node.isRequired, // PropTypes.node is used to specify that children can be any renderable React node
};

export default Content;
// This component can be used to wrap other components or content,
