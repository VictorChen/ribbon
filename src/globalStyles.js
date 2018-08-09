import styles from './styles';
import { injectGlobal } from 'styled-components';

injectGlobal`
  body {
    color: ${styles.bodyTextColor};
    padding: 0;
    margin: 0;
    font-family: sans-serif;
  }

  h1 {
    font-size: 30px;
    margin: 0;
  }
`;
