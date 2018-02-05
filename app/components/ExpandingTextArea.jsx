import React, { Component, } from 'react';
import PropTypes from 'prop-types';

class ExpandingTextArea extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this._handleChange = this._handleChange.bind(this);
    this._adjustTextarea = this._adjustTextarea.bind(this);
    this._focusTextArea = this._focusTextArea.bind(this);
  }

  componentDidMount() {
    this._adjustTextarea({});
    this._focusTextArea({});
  }

  _handleChange(e) {
    const { onChange, } = this.props;
    if (onChange) onChange(e);
    this._adjustTextarea(e);
  }

  _adjustTextarea({ target = this.el, }) {
    const textAreaRef = target;
    textAreaRef.style.height = 0;
    textAreaRef.style.height = `${target.scrollHeight}px`;
  }

  _focusTextArea({ target = this.el, }) {
    const textAreaRef = target;
    textAreaRef.focus();
  }

  render() {
    const { onChange, ...rest } = this.props;
    return (
      <textarea
        {...rest}
        ref={(x) => { this.el = x; }}
        onChange={this._handleChange.bind(this)}
      />
    );
  }
}

export default ExpandingTextArea;
