import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import MyLoader from './Loader/MyLoader';
import Modal from './Modal/Modal';
import Button from './Button/Button';
import axios from 'axios';
import './app-style.scss';

const API_KEY = '37990722-3d7325777fa7dcec3ffe4a675';

function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [ hasMoreImages , setHasMoreImages] = useState(true);

  

  useEffect(() => {
    const fetchImages = async () => {
      if (query === '') return;

      setIsLoading(true);

      try {
        const response = await axios.get(
          `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
        );

        setImages(prevImages => [...prevImages, ...response.data.hits]);

        if (response.data.hits.length === 0) {
          setHasMoreImages(false);
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();

  }, [query, page]);

  const handleSearchSubmit = newQuery => {
    setQuery(newQuery);
    setImages([]);
    setPage(1);
    setHasMoreImages(true);
  };

  const loadMoreImages = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = image => {
    setModalImage(image);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <div>
      <div className="app-container">
        <Searchbar onSubmit={handleSearchSubmit} />
        <div className="content-container">
          <ImageGallery images={images} onImageClick={openModal} />
          {isLoading && <MyLoader />}
          {images.length > 0 && !isLoading && hasMoreImages && (
            <Button
              onClick={loadMoreImages}
              shouldRender={images.length >= 12 && !isLoading}
            />
          )}

          {modalImage && <Modal image={modalImage} onClose={closeModal} />}
        </div>
      </div>
    </div>
  );
}

export default App;







