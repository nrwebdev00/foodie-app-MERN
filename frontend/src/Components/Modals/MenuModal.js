import React from 'react'
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '10%',
    left: '7.5%',
    right: 'auto',
    bottom: 'auto',
    height:'75%',
    width:'85%',
    padding: '0',
    border: '2px solid var(--accent-color)'
  },
};
Modal.setAppElement('#root');

function MenuModal(props) {

  const afterOpenModal = () =>{

  }

  const closeModal = () =>{
    props.setModalStatus(false)
  }

  return (
    <Modal
      isOpen={props.isModalOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel = "HeaderMenuMOdal"
    >

      <div className="dynamic-sidebar header-menu-modal-view">
        <aside>
          <ul className='margin-top-6' role='list'>
            <li>Popular</li>
            <li>Ingredients</li>
            <li>Cuisine</li>
            <li>Courses</li>
            <li>Healthy Eating</li>
            <li>Family Friendly</li>
            <li>Holiday</li>
            <li>Dessert</li>
            <li>Drinks</li>
          </ul>
        </aside>
        <section>
          <div className="top-wrapper">
            <h3>Menu Header</h3>
            <div className="close-modal">
              X
            </div>
          </div>
          <div className="main-view-modal">

          </div>
        </section>
      </div>
    </Modal>
  )
}

export default MenuModal