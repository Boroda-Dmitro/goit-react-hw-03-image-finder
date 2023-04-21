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
  };

  onSubmit = searchImages => {
    this.setState({ search: searchImages, page: 1, images: [] });
    this.getImages(searchImages);
  };

  getImages = async (search, page) => {
    this.setState({ isLoading: true });
    try {
      const imagesArr = await fetchImages(search, page);
      if (imagesArr.length > 0) {
        this.setState(prevState => ({
          images: [...prevState.images, ...imagesArr],
        }));
      } else {
        return toast.error(`No images on serch ${search}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  onLoadMoreClick = () => {
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
    const { images, isLoading } = this.state;
    return (
      <section className={css.App}>
        <Searchbar onSubmit={this.onSubmit} />
        {images.length > 0 && <ImageGallery images={images} />}
        {isLoading && <Loader />}
        {images.length > 0 && <Button loadMore={this.onLoadMoreClick} />}
        <ToastContainer position="top-center" autoClose={2000} theme="light" />
      </section>
    );
  }
}
