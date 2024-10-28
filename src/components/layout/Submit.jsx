import Button from "@components/layout/Button.jsx";
import PropTypes from "prop-types";

Submit.propTypes = {
  text: PropTypes.string
};

function Submit({ text, ...rest }){
  return <Button type="submit" text={text} { ...rest }></Button>
}

export default Submit;