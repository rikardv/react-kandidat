import React, { Component, useState, useEffect } from "react";
import getAntalStudenter from "../../connections/test/getAntalStudenter";

const BarChartAntalStudenter = () => {
  const [antalStudenter, setAntalStudenter] = useState();

  useEffect(() => {
    getAntalStudenter().then((res) => {
      setAntalStudenter(res);
    });
  }, []);

  return <div> {antalStudenter} </div>;
};

export default BarChartAntalStudenter;
