import React from "react";
import App from "./src/app";
import { Grommet } from "grommet";
export const wrapRootElement = ({ element }) => {
  return (
    <Grommet theme={{}}>
    <App>{element}</App>
    </Grommet>
  );
};