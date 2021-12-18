import React from 'react';

import { Toast as ToastBase, ToastContainer } from 'react-bootstrap';

const Toast = ({
  variant, message, show, setshow,
}) => {
  return (
    <ToastContainer position="top-end">
      <ToastBase
        bg={variant}
        show={show}
        delay={3000}
        onClose={() => setshow(false)}
        autohide
        className="d-inline-block m-1"
      >
        <ToastBase.Body className={variant === 'Dark' && 'text-white'}>
          {message}
        </ToastBase.Body>
      </ToastBase>
    </ToastContainer>
  );
};

export default Toast;
