import React, { Component, } from 'react';
import { connect, } from 'react-redux';
import PropTypes from 'prop-types';
import ProgressArc from 'progress-arc-component';
import Styled from 'styled-components';
import Theme from 'styled-theming';

import * as constants from '../constants';

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
    userCredentials: PropTypes.object,
    weightedStatus: PropTypes.object,
  }

  static defaultProps = {
    userCredentials: null,
    weightedStatus: null,
  }

  constructor(props) {
    super(props);

    this._profileImageURL = this._profileImageURL.bind(this);
    this._calculateArcValue = this._calculateArcValue.bind(this);
    this._calculateArcColor = this._calculateArcColor.bind(this);
  }

  _calculateArcColor() {
    const { weightedStatus, } = this.props;

    let color = null;

    if (weightedStatus !== null) {
      if (weightedStatus.permillage > 1000) {
        color = constants.RED;
      } else {
        color = constants.BLUE;

        if (weightedStatus.permillage >= 900) {
          color = constants.YELLOW;
        }
      }
    } else {
      color = constants.BLUE;
    }

    return color;
  }

  _calculateArcValue() {
    const { weightedStatus, } = this.props;

    let arcValue = 0;

    if (weightedStatus !== null) {
      if (weightedStatus.permillage > 1000) {
        arcValue = parseInt(100, 10);
      } else {
        arcValue = parseInt((weightedStatus.permillage / 10), 10);
      }
    }

    return arcValue;
  }

  _profileImageURL() {
    const { userCredentials, } = this.props;

    if (userCredentials !== null) {
      return userCredentials.profileImageURL.replace('_normal.jpg', '.jpg');
    }

    return null;
  }

  render() {
    return (
      <UserProfilePhotoStyle>
        <ProfilePhotoImageStyle>
          <img src={this._profileImageURL()} alt="Profile" width="52" height="52" />
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

const mapStateToProps = (store) => {
  return {
    weightedStatus: store.weightedStatus,
    userCredentials: store.userCredentials,
  };
};

export default connect(mapStateToProps, null)(UserProfilePhoto);

