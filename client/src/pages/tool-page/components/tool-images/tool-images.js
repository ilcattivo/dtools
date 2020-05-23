import React, { Component } from 'react';
import Carousel, { Modal, ModalGateway } from 'react-images';
import ImgNotAvailable from '../../../../components/img-not-available';
import './style.sass';

class ToolImages extends Component {
  state = {
    isOpen: false,
  };

  toggleModal = () => {
    this.setState((state) => ({ isOpen: !state.isOpen }));
  };

  render() {
    const { isOpen } = this.state;
    const { images } = this.props;

    if (!images) {
      return <ImgNotAvailable className='tool-image' fontSize='2.5rem' />;
    }

    return (
      <>
        <div className='tool-image__wrapper'>
          <img
            src={images[1]}
            onClick={this.toggleModal}
            className='tool-image'
          />
        </div>
        <ModalGateway>
          {isOpen ? (
            <Modal onClose={this.toggleModal}>
              <Carousel
                views={images.map((img) => ({
                  source: img,
                }))}
              />
            </Modal>
          ) : null}
        </ModalGateway>
      </>
    );
  }
}

export default ToolImages;
