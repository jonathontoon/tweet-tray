import React, { Component, } from 'react';
import { connect, } from 'react-redux';
import PropTypes from 'prop-types';
import ExpandedTextArea from 'react-expanding-textarea';
import TwitterText from 'twitter-text';
import Styled from 'styled-components';
import Theme from 'styled-theming';

import * as constants from '../constants';

import { updateWeightedStatus, } from '../actions';

const StatusInputStyle = Styled.div`
    width: auto;
    user-select: auto;
    margin-top: 5px;
    margin-left: 66px;
    margin-bottom: ${constants.SPACING}px;
    background-color: transparent;

    .TextArea {
        line-height: 26px;
        outline: 0;
        border: 0;
        margin: 0;
        padding: 0;
        width: 100%;
        height: auto;
        resize: none;
        overflow-y: auto;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif !important;
        font-size: ${constants.LARGE_FONT_SIZE}px;
        font-weight: normal;
        color:  ${Theme('mode', { day: constants.BLACK, night: constants.WHITE, })};
        background-color: transparent;

        &::placeholder {
          color: ${constants.GREY};
        }
    }
`;

class StatusInput extends Component {
  static propTypes = {
    style: PropTypes.object,
    weightedStatus: PropTypes.object,
    onUpdateWeightedStatus: PropTypes.func.isRequired,
  }

  static defaultProps = {
    style: null,
    weightedStatus: null,
  }

  constructor(props) {
    super(props);
    this._onTextAreaUpdate = this._onTextAreaUpdate.bind(this);
  }

  _onTextAreaUpdate(e) {
    const { onUpdateWeightedStatus, } = this.props;

    const textValue = e.target.value;
    const parsedProperties = TwitterText.parseTweet(textValue);

    const status = {
      text: textValue,
      weightedLength: parsedProperties.weightedLength,
      permillage: parsedProperties.permillage,
      valid: parsedProperties.valid,
      displayRangeStart: parsedProperties.displayRangeStart,
      displayRangeEnd: parsedProperties.displayRangeEnd,
      validDisplayRangeStart: parsedProperties.validDisplayRangeStart,
      validDisplayRangeEnd: parsedProperties.validDisplayRangeEnd,
    };

    if (status.text.length !== 0) {
      onUpdateWeightedStatus(status);
    } else {
      onUpdateWeightedStatus(null);
    }
  }

  render() {
    const { style, weightedStatus, } = this.props;

    const defaultValue = weightedStatus === null ? '' : weightedStatus.text;

    return (
      <StatusInputStyle
        style={style}
      >
        <ExpandedTextArea
          className="TextArea"
          autoCapitalize="sentences"
          placeholder="What's happening?"
          rows={1}
          style={{
            minHeight: 58,
          }}
          onInput={this._onTextAreaUpdate}
          onKeyUp={this._onTextAreaUpdate}
          onChange={this._onTextAreaUpdate}
          defaultValue={defaultValue}
        />
      </StatusInputStyle>
    );
  }
}

const mapStateToProps = (store, ownProps) => {
  return {
    weightedStatus: store.weightedStatus,
    className: ownProps.className,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdateWeightedStatus: (weightedStatus) => {
      dispatch(updateWeightedStatus(weightedStatus));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StatusInput);

