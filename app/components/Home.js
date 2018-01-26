import React, { Component, } from 'react';
import Styled from 'styled-components';
import { Link, } from 'react-router-dom';

const ContainerStyle = Styled.div`
  position: absolute;
  top: 30%;
  left: 10px;
  text-align: center;

  & > h2 {
    font-size: 5rem;
  }

  & > a {
    font-size: 1.4rem;
  }
`;

class Home extends Component {
  render() {
    return (
      <div>
        <ContainerStyle data-tid="container">
          <h2>Home</h2>
          <Link to="/counter">to Counter</Link>
        </ContainerStyle>
      </div>
    );
  }
}

export default Home;
