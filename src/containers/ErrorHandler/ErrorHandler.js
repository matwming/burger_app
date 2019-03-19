import React, { useState, useEffect, Fragment } from "react";
import Modal from "../../components/UI/Modal/Modal";
import useHttpErrorHandler from "../../hooks/http-error-handler";
const ErrorHandler = (WrappedComponent, axios) => {
 return props => {
  const [error, clearError] = useHttpErrorHandler(axios);
  return (
   <Fragment>
    <Modal show={error} clicked={clearError}>
     {error ? error.message : null}
    </Modal>
    <WrappedComponent {...props} />;
   </Fragment>
  );
 };
};

export default ErrorHandler;
