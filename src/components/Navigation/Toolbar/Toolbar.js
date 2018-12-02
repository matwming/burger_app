import React from "react";
import styled from "styled-components";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggler from "../SideDrawer/DrawerToggler/DrawerToggler";
const Header = styled.header`
 height: 56px;
 width: 100%;
 position: fixed;
 top: 0;
 left: 0;
 background-color: #703b09;
 display: flex;
 justify-content: space-between;
 align-items: center;
 padding: 0 20px;
 box-sizing: border-box;
 z-index: 90;
`;
const Nav = styled.nav`
 height: 100%;
 @media (max-width: 499px) {
  display: none;
 }
`;
const toolbar = props => (
 <Header>
  <DrawerToggler clicked={props.clicked} />
  <Logo height="80%" />
  <Nav>
   <NavigationItems />
  </Nav>
 </Header>
);

export default toolbar;
