import React from "react";
import styled from "styled-components";
import NavigationItem from "./NavigationItem/NavigationItem";
const UL = styled.ul`
 margin: 0;
 padding: 0;
 list-style: none;
 display: flex;
 align-items: center;
 height: 100%;
 @media (max-width: 500px) {
  flex-direction: column;
 }
`;
const navigationItems = props => (
 <UL>
  <NavigationItem link="/">Burger Builder</NavigationItem>
  {props.isAuthenticated ? <NavigationItem link="/orders">Orders</NavigationItem> : ""}
  {!props.isAuthenticated ? (
   <NavigationItem link="/auth">Authenticate</NavigationItem>
  ) : (
   <NavigationItem link="/logout">logout</NavigationItem>
  )}
 </UL>
);

export default navigationItems;
