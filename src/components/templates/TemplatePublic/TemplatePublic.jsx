import React from 'react';

import Proptypes from 'prop-types';

import './TemplatePublic.css';

const TemplatePublic = ({ children }) => (
  <div className="template-public-container">
    <div className="template-public-background" />
    <div className="template-public-content">
      {children}
    </div>
  </div>
);

TemplatePublic.propTypes = {
  children: Proptypes.node.isRequired,
};

export default TemplatePublic;
