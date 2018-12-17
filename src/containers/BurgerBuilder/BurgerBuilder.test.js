import { BurgerBuilder } from "./BurgerBuilder";
import { configure, shallow } from "enzyme";
import React from "react";
import Adapter from "enzyme-adapter-react-16";
import BuildControls from "../../components/Burger/BurgerControls/BurgerControls";
configure({ adapter: new Adapter() });

describe("<BurgerBuilder />", () => {
 let wrapper;
 beforeEach(() => {
  wrapper = shallow(<BurgerBuilder onInitIngredients={() => {}} onInitPurchase={() => {}} />);
 });
 it("should render <BuildControls /> when receiving ingredients", () => {
  wrapper.setProps({ ings: { salad: 0 }, purchased: true });
  expect(wrapper.find(BuildControls)).toHaveLength(1);
 });
});
