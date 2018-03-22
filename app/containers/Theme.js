import React from 'react';
import PropTypes from 'prop-types';
import { connect, } from 'react-redux';

const Theme = (ThemedWrappedComponent) => {
  return class extends Component {
    static propTypes = {
      theme: PropTypes.string.isRequired,
    }

    render() {
      const { theme, } = this.props;
      return (
        <ThemedWrappedComponent
          theme={theme}
        />
      );
    }
  };
};

const mapStateToProps = (store) => {
  return {
    theme: store.theme,
  };
};

export default connect(mapStateToProps, null)(Theme);

