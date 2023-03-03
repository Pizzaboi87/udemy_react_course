import styled from 'styled-components';

export const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 380px;

  @media (orientation: portrait) {
    width: 100%;
    margin-top: 50px;
  }

  h2 {
    margin: 10px 0;
  }
`;