import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';

import AddRecipeModal from './AddRecipeModal';
import AddArticleModal from './AddArticleModal';

function ModalsBtnsHeader() {
  const [ addRecipeModal, setAddRecipeModal ] = useState(false);
  const [addArticleModal, setAddArticleModal ] = useState(false);

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin





  return (
    <div className='modal-wrapper'>
      <div
        className="modal-btn btn raise-up-hover-effect"
        onClick={() => setAddRecipeModal(!addRecipeModal)}
      > Add Recipe
        <AddRecipeModal
          addRecipeModal={addRecipeModal}
          setAddRecipeModal={setAddRecipeModal}
        />
      </div>
      <div
        className="modal-btn btn raise-up-hover-effect"
        onClick={() => setAddArticleModal(!addArticleModal)}
      >
        Add Article
        <AddArticleModal
          addArticleModal={addArticleModal}
          setAddArticleModal={setAddArticleModal}
        />
      </div>


    </div>
  )
}

export default ModalsBtnsHeader