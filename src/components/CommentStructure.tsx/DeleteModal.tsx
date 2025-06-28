import React from 'react';

import { GlobalContext } from '../../context/Provider'
import Modal from 'react-modal';

interface DeleteModalProps {
  comId: string
  parentId?: string
}

const DeleteModal = ({ comId, parentId }: DeleteModalProps) => {
  const [open, setOpen] = React.useState(false)
  const onOpenModal = () => setOpen(true)
  const onCloseModal = () => setOpen(false)
  const globalStore: any = React.useContext(GlobalContext)

  const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    maxWidth: '240px',
    margin:'auto',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '2rem',
    borderRadius: '8px'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex:1000
  }
};


  return (
    <div>
      <div style={{ width: '100%' }} onClick={onOpenModal}>
        delete
      </div>
      <Modal isOpen={open} onAfterOpen={onOpenModal} onRequestClose={onCloseModal} style={customStyles}>
        <h2 style={{textAlign: 'center'}}>Are you sure?</h2>
        <p style={{textAlign: 'center'}}>Once you delete this comment it will be gone forever.</p>
        <div className='deleteBtns'>
          <button
            className='delete'
            onClick={async () => (
              await globalStore.onDelete(comId, parentId),
              globalStore.onDeleteAction &&
                (await globalStore.onDeleteAction({
                  comIdToDelete: comId,
                  parentOfDeleteId: parentId
                }))
            )}
          >
            Delete
          </button>
          <button className='cancel' onClick={onCloseModal}>
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  )
}

export default DeleteModal
