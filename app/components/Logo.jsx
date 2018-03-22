import React from 'react';
import Styled from 'styled-components';

import LogoImage from '../../resources/tweet-tray-logo.svg';

const LogoStyle = Styled.img`
    width: 34px;
    height: 28px;
    position: relative;
    top: 40px;
`;

const Logo = () => {
  return (
    <LogoStyle src={LogoImage} alt="Twitter Logo" />
  );
};

export default Logo;

