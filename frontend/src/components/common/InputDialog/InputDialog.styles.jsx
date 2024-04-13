import styled, { css } from "styled-components";

export const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  z-index: 9999999999999;
`;

export const Model = styled.div`
  display: inline-block;
  margin-top: 60px;
  border-radius: 5px;
  background: #ffffff;
  width: 40%;
`;

export const ModelHeading = styled.div`
  border-bottom: 1px solid #dddddd;
  padding: 20px 20px 20px;
  font-weight: bold;
  color: #000000;
`;

export const ModelBody = styled.div`
  border-bottom: 1px solid #dddddd;
  padding: 20px 20px 20px;
  font-weight: 400;
`;

export const ModelFooter = styled.div`
  padding: 20px 20px 20px;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const Input = styled.input`
  width: 100%;
  height: 40px;
  padding: 0 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  outline: none;
`;

export const Button = styled.button`
  height: 40px;
  outline: none;
  border: none;
  border-radius: 8px;
  padding: 0 12px;
  margin-left: 12px;
  cursor: pointer;

  ${(props) =>
    props.primary &&
    css`
      background: #6366f1;
      color: white;
    `}

  ${(props) =>
    props.danger &&
    css`
      background: #ef4444;
      color: white;
    `}
`;
