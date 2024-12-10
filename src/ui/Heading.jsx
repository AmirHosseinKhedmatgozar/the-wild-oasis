import styled, { css } from "styled-components";

const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-weight: 800;
      font-size: 1rem;
    `}

  ${(props) =>
    props.as === "h2" &&
    css`
      font-weight: 700;
      font-size: 2rem;
    `}
  
  ${(props) =>
    props.as === "h3" &&
    css`
      font-weight: 600;
      font-size: 3rem;
    `}

    ${(props) =>
    props.as === "h4" &&
    css`
      font-weight: 500;
      font-size: 4rem;
    `}
`;

export default Heading;
