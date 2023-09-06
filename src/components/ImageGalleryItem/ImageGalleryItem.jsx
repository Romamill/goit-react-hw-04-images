
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ image }) => {
  return (
    <li className="gallery-item">
      <img src={image.webformatURL} alt="" />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
  }).isRequired,
};

export default ImageGalleryItem;
