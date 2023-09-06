import PropTypes from 'prop-types';
import './image-gallery-styled.scss';

const ImageGallery = ({ images, onImageClick }) => {
  return (
    <div className='image-gallery-container'>
      {images.map(image => (
        <img
          key={image.id}
          src={image.webformatURL}
          alt=""
          onClick={() => onImageClick(image)}
        />
      ))}
    </div>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGallery;