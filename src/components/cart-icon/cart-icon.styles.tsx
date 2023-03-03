import styled from 'styled-components';

export const CartIconContainer = styled.div`
  width: 45px;
  height: 45px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  svg {
    width: 24px;
    height: 24px;

    @media (orientation: portrait) {
      width: 40px;
      height: 40px;
    }
  }
`;

export const ItemCount = styled.span`
  position: absolute;
  font-size: 10px;
  font-weight: bold;
  bottom: 12px;

  @media (orientation: portrait) {
    font-size: 15px;
    bottom: 7px;
  }
`;