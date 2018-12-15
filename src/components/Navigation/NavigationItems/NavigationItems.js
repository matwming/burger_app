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
const navigationItems = () => (
 <UL>
  <NavigationItem link="/">Burger Builder</NavigationItem>
  <NavigationItem link="/orders">Orders</NavigationItem>
  <NavigationItem link="/auth">Authenticate</NavigationItem>
 </UL>
);

export default navigationItems;
