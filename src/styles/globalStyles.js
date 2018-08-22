import { injectGlobal } from 'styled-components';
import { styles } from './common';
import tooltipStyles from './tooltipStyles';

injectGlobal`
  body {
    color: ${styles.white1};
    padding: 0;
    margin: 0;
    font-family: 'Open Sans', sans-serif;
  }

  input, textarea, select { font-family:inherit; }

  h1 {
    font-size: 30px;
    margin: 0;
  }

  ${tooltipStyles}
`;
