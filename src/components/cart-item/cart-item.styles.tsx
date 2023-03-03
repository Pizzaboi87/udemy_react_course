import styled from 'styled-components';

export const CartItemContainer = styled.div`
  width: 100%;
  display: flex;
  height: 80px;
  margin-bottom: 15px;

  @media (orientation: portrait) {
    height: auto;
  }

  img {
    width: 30%;
    height: auto;
  }
`;

export const ItemDetails = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 10px 20px;

  span {
    font-size: 16px;

    @media (orientation: portrait) {
      font-size: 20px;
    }
  }
`;