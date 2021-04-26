import { Box, Typography } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";

import PropTypes from "prop-types";

const withStyle = withStyles((theme) => ({
  box: {
    color: theme.colors.red,
    textAlign: "center",
  },
}));

const DemoBox = (props) => {
  console.log("DemoBox props", props);
  return (
    <Box className={props.classes.box}>
      <Typography variant="h1">This is a Demo Box</Typography>
      <Typography variant="h2">{props.text}</Typography>
    </Box>
  );
};

DemoBox.propTypes = {
  text: PropTypes.string.isRequired,
};

// export default DemoBox
export default withStyle(DemoBox);
