import PropTypes from 'prop-types';

Button.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
  bgColor: PropTypes.string,
};

function Button({text,type,bgColor='black',...rest }){
  let btnColor = {
    sky: "bg-sky-400",
    indigo: "bg-indigo-500",
  };
  
  return <button type={type} className={`${btnColor[bgColor]}` } { ...rest }>{text}</button>
}

export default Button;