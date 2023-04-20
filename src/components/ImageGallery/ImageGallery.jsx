import { ImageGalleryItem } from "./ImageGalleryItem";
import css from './ImageGallery.module.css';

export const ImageGallery = ({images}) => (
  <ul className={css.ImageGallery}>
    {images.map(({id, webformatURL, largeImageURL}) => {
        return (
            <ImageGalleryItem key={id} src={webformatURL} srcModal={largeImageURL}/>
        )
    })} 
  </ul>
);
