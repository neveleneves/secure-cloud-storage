import React from "react";
import Loader from "react-loader-spinner";

export const LoadingSpinner = () => {
  return (
    <Loader
      type="Oval"
      color="#0F82EC"
      height={70}
      width={70}
      timeout={5000}
    />
  );
};
