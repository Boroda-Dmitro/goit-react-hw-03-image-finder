import PropTypes from 'prop-types';
import { ImageGalleryItem } from './ImageGalleryItem';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ images, onOpenModal }) => (
  <ul className={css.ImageGallery}>
    {images.map(({ id, webformatURL, largeImageURL, tags }) => {
      return (
        <ImageGalleryItem
          key={id}
          src={webformatURL}
          srcModal={largeImageURL}
          alt={tags}
          onOpenModal={onOpenModal}
        />
      );
    })}
  </ul>
);

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
};
