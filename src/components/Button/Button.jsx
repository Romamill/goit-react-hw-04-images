import PropTypes from 'prop-types';
import './button.scss';

const Button = ({ onClick, shouldRender }) => {
  return shouldRender ? (
    <button type="button" className="button" onClick={onClick}>
      Load more
    </button>
  ) : null;
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  shouldRender: PropTypes.bool.isRequired,
};

export default Button;
