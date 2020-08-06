import React from 'react';
import PropTypes from 'prop-types';

class ShowTimeComponent extends React.Component {
  render() {
    return (
      <div className="show-time-component">
      	What's the time? {this.props.time}
      </div>
    );
  }
}

ShowTimeComponent.propTypes = {
	time: PropTypes.string.isRequired
}

export default ShowTimeComponent;
