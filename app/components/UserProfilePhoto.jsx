import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';
import Theme from 'styled-theming';

import * as constants from '../constants';

import ProgressArc from './ProgressArc';

const UserProfilePhotoStyle = Styled.div`
    overflow: hidden;
    width: 58px;
    height: 58px;
    position: absolute;
    left: 12px;
    top: 17px;
`;

const ProfilePhotoImageStyle = Styled.div`
    position: relative;
    top: 3px;
    left: 3px;
    border-radius: 50px;
    overflow: hidden;
    width: 52px;
    height: 52px;
    background-color: ${Theme('mode', { day: constants.LIGHT_GREY, night: constants.DARK_MODE_FOREGROUND, })};
`;

const WordCounterStyle = Styled.div`
    position: absolute;
    height: 60px;
    width: 60px;
    top: -1px;
    left: -1px;

    .SVG {
        height: 100%;
        width: 100%;
        margin: 0px;
        position: relative;

        circle {
          stroke-width: 8px !important;
        }
      }
    }
`;

class UserProfilePhoto extends Component {
  static propTypes = {
    profilePhotoURL: PropTypes.string,
    weightedTextAmount: PropTypes.number,
  }

  static defaultProps = {
    profilePhotoURL: null,
    weightedTextAmount: null,
  }

  constructor(props) {
    super(props);

    this._calculateArcValue = this._calculateArcValue.bind(this);
    this._calculateArcColor = this._calculateArcColor.bind(this);
  }

  _calculateArcColor() {
    const { weightedTextAmount, } = this.props;

    let color = null;

    if (weightedTextAmount !== null) {
      if (weightedTextAmount > 1000) {
        color = constants.RED;
      } else {
        color = constants.BLUE;

        if (weightedTextAmount >= 900) {
          color = constants.YELLOW;
        }
      }
    } else {
      color = constants.BLUE;
    }

    return color;
  }

  _calculateArcValue() {
    const { weightedTextAmount, } = this.props;

    let arcValue = 0;

    if (weightedTextAmount !== null) {
      if (weightedTextAmount > 1000) {
        arcValue = parseInt(100, 10);
      } else {
        arcValue = parseInt((weightedTextAmount / 10), 10);
      }
    }

    return arcValue;
  }

  render() {
    const { profilePhotoURL, } = this.props;

    return (
      <UserProfilePhotoStyle>
        <ProfilePhotoImageStyle>
          <img src={profilePhotoURL} alt="Profile" width="52" height="52" />
        </ProfilePhotoImageStyle>
        <WordCounterStyle>
          <ProgressArc
            textVisible={false}
            arcColor={this._calculateArcColor()}
            rounded
            arcBackgroundColor="transparent"
            className="SVG"
            value={this._calculateArcValue()}
          />
        </WordCounterStyle>
      </UserProfilePhotoStyle>
    );
  }
}

export default UserProfilePhoto;
