import styled from 'styled-components';
import { styles } from '../styles/common';

const MainContainer = styled.div`
  background-color: ${styles.dark1};
  padding: 40px;
  & + & {
    margin-top: 20px;
  }
`;

export default MainContainer;
