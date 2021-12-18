import React from 'react';
import PropTypes from 'prop-types';

import './TemplatePrivate.css';

const TemplatePrivate = ({ children }) => (
  <div>
    <nav className="template-private-navbar">
      <div>
        <a
          href="/my-pets"
          className="template-private-pets-logo"
        >
          Pet Lovers
        </a>
      </div>
      <div className="template-private-nav-links">
        <a href="/my-pets">My Pets</a>
        <a href="/my-pets-new">New Pet</a>
        <a href="/logout">Logout</a>
      </div>
    </nav>
    <div className="template-private-content">
      {children}
    </div>
  </div>
);

TemplatePrivate.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TemplatePrivate;
