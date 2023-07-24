import styled, { keyframes } from 'styled-components';

const slide = keyframes`
  0% {
		background-position: 100% 0%;
	}
	100% {
		background-position: 0% 0%;
	} 
`;

export const GradientLoader = styled.div`
  background: ${(props: { loading: boolean }) =>
    props.loading
      ? `repeating-linear-gradient(
    45deg,
    #e8ebff,
    #e8ebff 10px,
    #7584d6 10px,
    #7584d6 20px
  )`
      : 'none'};
  height: 5px;
  background-size: 400% 400%;
  animation: ${slide} 40s linear infinite;
  transform: scale(1, -1);
`;

interface WrapProps {
  isModal?: boolean;
}

export const Wrapper = styled.div`
  max-width: 1080px;
  ${({ isModal }: WrapProps) =>
    isModal
      ? `

    max-height: 520px;
    overflow-y: auto;
  
  `
      : ''}
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1fr 0.75fr 0.85fr 1.35fr 1fr 30px;
`;

export const TableHeader = styled(Grid)`
  padding: 16px;
  background: rgba(39, 47, 90, 0.04);
  border-bottom: 1px solid #dcdee4;
`;

export const Year = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  user-select: none;
  cursor: pointer;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid #dcdee4;
`;

export const Month = styled(Grid)`
  padding: 16px;
  align-items: center;
  user-select: none;
  color: #272f5ab2;

  .month-name {
    text-transform: capitalize;
    font-weight: 600;
    font-size: 16px;
    color: #272f5a;
  }
`;

export const PreviousReading = styled(Month)`
  background: #272f5a08;
`;

export const ArrowButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateX(10px);
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
  transition: 0.4s;

  &:hover {
    background: #eff0f1;
  }
`;

export const ArrowButtonBlock = styled.div`
  width: 30px;
  height: 30px;
`;
