import styled from "styled-components";

export const Button = styled.button
`
  position: relative;
  border: 0;
  padding: ${(props) => props.size === 'large' ? '15px 25px' : '10px 20px'};
  display: inline-block;
  text-align: center;
  font-size: 24px;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) =>
    props.color === 'red' ? props.theme.colors.red : props.theme.colors.gray};
  box-shadow: 0px 4px 0px
    ${(props) =>
      props.color === 'red' ? props.theme.colors.redShadow : props.theme.colors.grayShadow};
  transition: top 0.1s, box-shadow 0.1s, background-color 0.1s;

  &:active {
    top: 4px;
    box-shadow: 0 0;
    background-color: ${(props) =>
      props.color === 'red' ? props.theme.colors.redActive : props.theme.colors.grayActive};
  }
`;