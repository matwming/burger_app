import React, { Fragment } from "react";
import Toolbar from "../Navigation/Toolbar/Toolbar";
const layout = props => (
 <Fragment>
  <Toolbar />

  <main style={{ marginTop: "72px" }}>{props.children}</main>
 </Fragment>
);

export default layout;
