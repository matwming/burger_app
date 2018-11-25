import React from "react";
import { Label, ButtonMore, ButtonLess, BuildControl } from "./BuildControlStyles";

const buildControl = props => (
 <BuildControl>
  <Label>{props.label}</Label>
  <ButtonLess onClick={props.removed} disabled={props.disabled}>
   Less
  </ButtonLess>
  <ButtonMore onClick={props.added}>More</ButtonMore>
 </BuildControl>
);

export default buildControl;
