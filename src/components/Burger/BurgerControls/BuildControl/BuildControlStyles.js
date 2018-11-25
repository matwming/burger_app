import styled from "styled-components";

export const BuildControl = styled.div`
 display: flex;
 flex-flow: row;
 justify-content: space-between;
 align-items: center;
 margin: 5px 0;
`;
export const Button = styled.button`
 display: block;
 padding: 5px;
 margin: 0 5px;
 width: 80px;
 border: 1px solid #aa6817;
 cursor: pointer;
 outline: none;
 :disabled {
  background-color: #ac9980;
  border: 1px solid #7e7365;
  color: #ccc;
  cursor: default;
 }
 :hover:disabled {
  background-color: #ac9980;
  color: #ccc;
  cursor: not-allowed;
 }
`;
export const Label = styled.div`
 padding: 10px;
 font-weight: bold;
 width: 80px;
`;
export const ButtonLess = styled(Button)`
 background-color: #d39952;
 color: white;
 :hover,
 :active {
  background-color: #daa972;
  color: white;
 }
`;
export const ButtonMore = styled(Button)`
 background-color: #8f5e1e;
 color: white;
 :hover,
 :active {
  background-color: #99703f;
  color: white;
 }
`;
