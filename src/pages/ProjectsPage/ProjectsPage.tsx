import { useSearchParams } from 'react-router-dom'
import plusIcon from '../../assets/icons/plus.svg'
import { Modal } from '../../components/Modal/Modal'
import { CreateTaskForm } from '../../components/forms/CreateTaskForm'
import { TaskList } from '../../components/lists/TaskList'
import { cn } from '../../utils/cn'

interface Props {
  className?: string
}

export const ProjectsPage = ({ className }: Props) => {
  const [searchParams] = useSearchParams()

  const projectId = Number(searchParams.get('projectId'))
  const projectName = searchParams.get('projectName')

  if (!projectId) return null

  return (
    <main className={cn('', className)}>
      <h1 className='text-3xl mb-8 capitalize'>{projectName}</h1>
      <Modal>
        <Modal.Open
          renderTrigger={openModal => (
            <button
              onClick={openModal}
              className="bg-white p-4 w-full flex items-center font-bold rounded-xl cursor-pointer mb-10 gap-x-5"
            >
              <img src={plusIcon} width={16} height={16} alt="Create task" />
              <span>Create new Task</span>
            </button>
          )}
        />
        <Modal.Content
          renderContent={closeModal => (
            <CreateTaskForm onActionEnd={closeModal} projectId={projectId} />
          )}
        />
      </Modal>
      <TaskList projectId={projectId} />
    </main>
  )
}
