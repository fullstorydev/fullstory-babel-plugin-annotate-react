import { Box, Typography } from '@material-ui/core';
import { withTheme } from 'theming';

import PropTypes from 'prop-types';

const DemoBox = props => {
  console.log("DemoBox props", props);
  return (
  <Box style={props.theme}>
    <Typography variant='h1'>This is a Demo Box</Typography>
    <Typography variant='h2'>{props.text}</Typography>
  </Box>
  );
}

DemoBox.propTypes = {
  text: PropTypes.string.isRequired
}

// export default DemoBox
export default withTheme(DemoBox);