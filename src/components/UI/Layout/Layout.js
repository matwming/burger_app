import React, { Fragment, useState } from "react";
import Toolbar from "../../Navigation/Toolbar/Toolbar";
import SideDrawer from "../../Navigation/SideDrawer/SideDrawer";
const layout = props => {
 const [showSideDrawer, controlSideDrawer] = useState(true);

 function sideDrawerClosedHandler() {
  controlSideDrawer(false);
 }
 function showSideDrawerHandler() {
  controlSideDrawer(true);
 }
 return (
  <Fragment>
   <Toolbar clicked={showSideDrawerHandler} />
   <SideDrawer closed={sideDrawerClosedHandler} open={showSideDrawer} />
   <main style={{ marginTop: "72px" }}>{props.children}</main>
  </Fragment>
 );
};

export default layout;
