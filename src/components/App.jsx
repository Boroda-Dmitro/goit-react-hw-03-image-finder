import { Component } from 'react';
import { fetchImages } from '../servises/pixabay_Api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Triangle } from 'react-loader-spinner';
import css from './App.module.css';

export class App extends Component {
  state = {
    search: '',
    images: [],
    page: 1,
    isLoading: false,
  };

  onSubmit = searchImages => {
    this.setState({ search: searchImages, page: 1 });
    this.getImages(searchImages);
  };

  getImages = async (search, page) => {
    this.setState({ isLoading: true });
    if (search !== this.state.search) {
      try {
        const imagesArr = await fetchImages(search, page);
        this.setState({ images: imagesArr });
      } catch (error) {
        console.log(error);
      } finally {
        this.setState({ isLoading: false });
      }
    } else {
      try {
        const imagesArr = await fetchImages(search, page);

        this.setState(prevState => ({
          images: [...prevState.images, ...imagesArr],
        }));
      } catch (error) {
        console.log(error);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  };

  onLoadMoreClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }), () => {
      const { search, page } = this.state;
      console.log(page);
      this.getImages(search, page);
    });
  };

  render() {
    const { images, isLoading } = this.state;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.onSubmit} />
        {images.length > 0 && <ImageGallery images={images} />}
        {isLoading && (
          <Triangle
            height="80"
            width="100%"
            color="#3f51b5"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        )}
        {images.length > 0 && <Button loadMore={this.onLoadMoreClick} />}
      </div>
    );
  }
}
