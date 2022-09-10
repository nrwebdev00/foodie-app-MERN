import React from 'react'
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

function AddRecipeModal(props) {

  const afterOpenModal = () => {

  }

  const closeModal = () => {
    props.setAddRecipeModal(false);
  }

  return (
    <Modal
      isOpen={props.addRecipeModal}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <div className="add-recipe-modal">
        <div
          className="close-modal"
          onClick={() => props.setAddRecipeModal(false)}
        >
          X
        </div>
        <div className="main-view-modal">
            <h2 className='text-align-center'>Add Recipe</h2>
        </div>
      </div>
    </Modal>
  )
}

export default AddRecipeModal