import { Component } from 'react';

import { Modal } from '../Modal/Modal';
import css from './ImageGalleryItem.module.css';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
    }));
  };

  render() {
    return (
      <li className={css.ImageGalleryItem} onClick={this.toggleModal}>
        <img
          src={this.props.src}
          alt=""
          className={css.ImageGalleryItem__image}
        />
        {this.state.showModal && (
          <Modal src={this.props.srcModal} onClose={this.toggleModal} />
        )}
      </li>
    );
  }
}
