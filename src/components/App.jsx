import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import MyLoader from './Loader/MyLoader';
import Modal from './Modal/Modal';
import Button from './Button/Button';
import axios from 'axios';
import './app-styled.scss';

const API_KEY = '37990722-3d7325777fa7dcec3ffe4a675';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      images: [],
      page: 1,
      isLoading: false,
      modalImage: null,
      hasMoreImages: true,
    };
  }

  componentDidMount() {
    this.fetchImages();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.fetchImages();
    }
  }

  fetchImages = async () => {
    const { query, page } = this.state;

    if (query === '') return;

    try {
      this.setState({ isLoading: true });

      const response = await axios.get(
        `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );

      this.setState(prevState => ({
        images: [...prevState.images, ...response.data.hits],
      }));

      if (response.data.hits.length === 0) {
        this.setState({ hasMoreImages: false });
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSearchSubmit = newQuery => {
    this.setState({
      query: newQuery,
      images: [],
      page: 1,
      hasMoreImages: true,
    });
  };

  loadMoreImages = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  openModal = image => {
    this.setState({ modalImage: image });
  };

  closeModal = () => {
    this.setState({ modalImage: null });
  };

  render() {
    const { images, isLoading, modalImage } = this.state;

    return (
      <div>
        <div className="app-container">
          <Searchbar onSubmit={this.handleSearchSubmit} />
          <div className="content-container">
            <ImageGallery images={images} onImageClick={this.openModal} />
            {isLoading && <MyLoader />}
            {images.length > 0 && !isLoading && (
              <Button
                onClick={this.loadMoreImages}
                shouldRender={images.length >= 12 && !isLoading}
              />
            )}

            {modalImage && (
              <Modal image={modalImage} onClose={this.closeModal} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
