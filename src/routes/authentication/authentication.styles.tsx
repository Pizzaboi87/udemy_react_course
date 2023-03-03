import styled from 'styled-components';

export const AuthenticationContainer = styled.div`
  display: flex;
  width: 900px;
  justify-content: space-between;
  margin: 30px auto;

  @media (orientation: portrait) {
    flex-direction: column;
    width: 100%;
    margin: 0 auto;
    align-content: space-between;
  }
`;