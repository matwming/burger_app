import React, { Fragment, useState } from "react";
import Toolbar from "../../Navigation/Toolbar/Toolbar";
import SideDrawer from "../../Navigation/SideDrawer/SideDrawer";
import { connect } from "react-redux";
const layout = props => {
 const [showSideDrawer, controlSideDrawer] = useState(true);

 function sideDrawerClosedHandler() {
  controlSideDrawer(false);
 }
 function showSideDrawerHandler() {
  controlSideDrawer(true);
 }
 console.log("showSideDrawer", showSideDrawer);
 return (
  <Fragment>
   <Toolbar clicked={showSideDrawerHandler} isAuth={props.isAuthenticated} />
   <SideDrawer
    closed={sideDrawerClosedHandler}
    open={showSideDrawer}
    isAuth={props.isAuthenticated}
   />
   <main style={{ marginTop: "72px" }}>{props.children}</main>
  </Fragment>
 );
};
const mapStateToProps = state => {
 return {
  isAuthenticated: state.auth.token !== null
 };
};
export default connect(
 mapStateToProps,
 null
)(layout);
