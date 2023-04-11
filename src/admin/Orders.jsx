import React from "react";
import Helmet from "../components/Helmet/Helmet";
import { ComponentSpinner } from "../components/Loading/loading";

const Orders = () => {
  return (
    <Helmet title="Orders">
      <ComponentSpinner />
    </Helmet>
  );
};

export default Orders;
