import { Project as IProject } from '../../store/project/types'
import { cn } from '../../utils/cn'

import toast from 'react-hot-toast'
import { useSearchParams } from 'react-router-dom'
import plusIcon from '../../assets/icons/plus.svg'
import {
  useDeleteProjectMutation,
  useUpdateProjectMutation,
} from '../../store/project/projectApi'
import { showError } from '../../utils/showError'

interface Props extends IProject {
  className?: string
}

export const Project = ({ className, id, name }: Props) => {
  const [deleteProject, { isLoading }] = useDeleteProjectMutation()
  const [updateProject, { isLoading: updateLoading }] =
    useUpdateProjectMutation()
  const [_, setSearchParams] = useSearchParams()

  const onDeleteProject = async () => {
    try {
      await deleteProject(id).unwrap()
    } catch (error) {
      showError(error)
    }
  }

  const onUpdateProject = async (e: React.FocusEvent<HTMLSpanElement>) => {
    const projectName = e.target.innerText
    if (projectName === name) return
    if (!projectName.trim()) {
      toast.error('Project name cannot be empty')
      e.target.innerText = name
      return
    }

    try {
      await updateProject({ id, name: projectName }).unwrap()
    } catch (error) {
      e.target.innerText = name
      showError(error)
    }
  }

  return (
    <div
      className={cn(
        'pl-4 flex items-center justify-between relative',
        className
      )}
    >
      <button
        className="absolute left-0 top-0 w-full h-full cursor-pointer"
        onClick={() => {
          setSearchParams({ projectId: id.toString(), projectName: name })
        }}
      ></button>
      <span
        suppressContentEditableWarning
        onBlur={onUpdateProject}
        contentEditable
        className="font-bold text-[#4a304d] focus:outline-none block  text-center"
      >
        {name}
      </span>
      <button
        disabled={isLoading || updateLoading}
        onClick={onDeleteProject}
        className="bg-none w-4 h-4 block ml-auto cursor-pointer mr-4"
      >
        <img
          src={plusIcon}
          alt="Delete project"
          className="w-full h-full rotate-45"
        />
      </button>

      {/*<TaskList project={name} projectId={id} />*/}
    </div>
  )
}
