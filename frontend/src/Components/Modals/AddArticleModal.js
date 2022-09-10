import React from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    height:'100%',
    width:'45%',
    padding: '0',
    border: '2px solid var(--accent-color)',
    backgroundColor:'var(--accent-lighter-color)',
  },
};
Modal.setAppElement('#root');

function AddArticleModal(props) {

  const afterOpenModal = () => {

  }

  const closeModal = () =>{
    props.setAddArticleModal(false);
  }

  return (
    <Modal
    isOpen={props.addArticleModal}
    onAfterOpen={afterOpenModal}
    onRequestClose={closeModal}
    style={customStyles}
  >
    <div className="add-article-modal">
    <div className="top-wrapper">
            <h3>Add Article</h3>
            <div className="close-modal">
              X
            </div>
          </div>
      <div className="main-view-modal">

      </div>
    </div>
  </Modal>
  )
}

export default AddArticleModal