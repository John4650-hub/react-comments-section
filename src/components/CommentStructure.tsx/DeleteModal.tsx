import 'react-responsive-modal/styles.css'
import { Modal } from 'react-responsive-modal'
import { GlobalContext } from '../../context/Provider'

interface DeleteModalProps {
  comId: string
  parentId?: string
}

const DeleteModal = ({ comId, parentId }: DeleteModalProps) => {
  const [open, setOpen] = React.useState(false)
  const onOpenModal = () => setOpen(true)
  const onCloseModal = () => setOpen(false)
  const globalStore: any = React.useContext(GlobalContext)

  return (
    <div>
      <div style={{ width: '100%' }} onClick={onOpenModal}>
        delete
      </div>
      <Modal open={open} onClose={onCloseModal} center>
        <h2>Are you sure?</h2>
        <p>Once you delete this comment it will be gone forever.</p>
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
