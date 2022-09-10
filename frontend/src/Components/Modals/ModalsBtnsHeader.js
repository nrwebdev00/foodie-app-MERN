import React, { useState } from 'react'

import AddRecipeModal from './AddRecipeModal';
import AddArticleModal from './AddArticleModal';

function ModalsBtnsHeader() {
  const [ addRecipeModal, setAddRecipeModal ] = useState(false);
  const [addArticleModal, setAddArticleModal ] = useState(false);

  console.log(`Recipe Modal ${addRecipeModal}`)
  console.log(`Article Modal ${addArticleModal}` )
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