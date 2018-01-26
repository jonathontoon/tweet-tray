import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';
import { Link, } from 'react-router-dom';

const BackButtonStyle = Styled.button`
  position: absolute;
`;

const CounterStyle = Styled.div`
  position: absolute;
  top: 30%;
  left: 45%;
  font-size: 10rem;
  font-weight: bold;
  letter-spacing: -0.025em;
`;

const BtnGroupStyle = Styled.div`
  position: relative;
  top: 500px;
  width: 480px;
  margin: 0 auto;
`;

const BtnStyle = Styled.div`
  font-size: 1.6rem;
  font-weight: bold;
  background-color: #fff;
  border-radius: 50%;
  margin: 10px;
  width: 100px;
  height: 100px;
  opacity: 0.7;
  cursor: pointer;
  font-family: Arial, Helvetica, Helvetica Neue;

  &:hover {
    color: white;
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

class Counter extends Component {
  static propTypes = {
    increment: PropTypes.func.isRequired,
    incrementIfOdd: PropTypes.func.isRequired,
    incrementAsync: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired,
    counter: PropTypes.number.isRequired,
  };

  render() {
    const {
      increment, incrementIfOdd, incrementAsync, decrement, counter,
    } = this.props;
    return (
      <BtnGroupStyle>
        <BackButtonStyle data-tid="backButton">
          <Link to="/">
            <i className="fa fa-arrow-left fa-3x" />
          </Link>
        </BackButtonStyle>
        <CounterStyle data-tid="counter">
          {counter}
        </CounterStyle>
        <BtnGroupStyle>
          <BtnStyle onClick={increment} data-tclass="btn">
            <i className="fa fa-plus" />
          </BtnStyle>
          <BtnStyle onClick={decrement} data-tclass="btn">
            <i className="fa fa-minus" />
          </BtnStyle>
          <BtnStyle onClick={incrementIfOdd} data-tclass="btn">odd</BtnStyle>
          <BtnStyle onClick={() => { incrementAsync(); }} data-tclass="btn">async</BtnStyle>
        </BtnGroupStyle>
      </BtnGroupStyle>
    );
  }
}

export default Counter;
