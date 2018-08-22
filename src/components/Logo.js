import styled from 'styled-components';

const Logo = styled.div`
  align-items: center;
  background-color: #335ece;
  color: #1f3164;
  display: flex;
  font-size: 16px;
  font-weight: bold;
  height: 64px;
  justify-content: center;
  width: 64px;

  &:after {
    content: 'ribbon';
  }
`;

export default Logo;
