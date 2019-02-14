import React from "react";
import { Input } from "reactstrap";
import PropTypes from "prop-types";

const VidSelector = props => {
  return (
    <Input
      type="select"
      className="mt-3"
      onChange={props.onChangeHandler}
      value={props.value}
    >
      <option value="none">Normal</option>
      <option value="grayscale(100%)">Grayscale</option>
      <option value="sepia(100%)">Sepia</option>
      <option value="invert(100%)">Invert</option>
      <option value="hue-rotate(90deg)">Hue</option>
      <option value="blur(10px)">Blur</option>
      <option value="contrast(200%)">Contrast</option>
    </Input>
  );
};

VidSelector.propTypes = {
  onChangeHandler: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
};

export default VidSelector;
