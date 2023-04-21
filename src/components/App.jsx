import { Component } from 'react';
import { fetchImages } from '../servises/pixabay_Api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './App.module.css';

export class App extends Component {
  state = {
    search: '',
    images: [],
    page: 1,
    isLoading: false,
    hasMoreImages: false,
  };

  onSubmit = searchImages => {
    this.setState({ search: searchImages, page: 1, images: [] });
    this.getImages(searchImages);
  };

  getImages = async (search, page) => {
    this.setState({ isLoading: true });
    try {
      const { Arr, total } = await fetchImages(search, page);
      if (Arr.length > 0) {
        this.setState(prevState => ({
          images: [...prevState.images, ...Arr],
          hasMoreImages: total > prevState.images.length + Arr.length,
        }));
      } else {
        this.setState({ hasMoreImages: false });
        return toast.error(`No images on search ${search}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  onLoadMoreClick = () => {
    if (!this.state.hasMoreImages) return;
    this.setState(
      prevState => ({
        page: prevState.page + 1,
      }),
      () => {
        const { search, page } = this.state;
        this.getImages(search, page);
      }
    );
  };

  render() {
    const { images, isLoading, hasMoreImages } = this.state;
    return (
      <section className={css.App}>
        <Searchbar onSubmit={this.onSubmit} />
        {images.length > 0 && <ImageGallery images={images} />}
        {isLoading && <Loader />}
        {hasMoreImages && <Button loadMore={this.onLoadMoreClick} />}
        <ToastContainer position="top-center" autoClose={2000} theme="light" />
      </section>
    );
  }
}
