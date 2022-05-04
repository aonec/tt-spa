import styled, { keyframes } from 'styled-components';

export const Wrap = styled.div`
  width: 800px;
`;

export const Header = styled.div`
  height: 50px;
  background: rgba(243, 245, 246, 1);
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 10px;
  align-items: center;
  padding: 0 10px;
`;

const slide = keyframes`
  0% {
    background-position: 100% 0%;
  }
  
  100% {
    background-position: 0% 0%;
  } 
`;

export const GradientLoader = styled.div`
  background: repeating-linear-gradient(
    45deg,
    #e8ebff,
    #e8ebff 10px,
    #7584d6 10px,
    #7584d6 20px
  );
  height: 5px;
  background-size: 400% 400%;
  animation: ${slide} 40s linear infinite;
  transform: scale(1, -1);
`;

export const Column = styled.div``;
