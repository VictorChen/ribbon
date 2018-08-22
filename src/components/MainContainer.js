import styled from 'styled-components';

const MainContainer = styled.div`
  background-color: #0d1738;
  padding: 40px;
  & + & {
    margin-top: 20px;
  }
`;

export default MainContainer;
