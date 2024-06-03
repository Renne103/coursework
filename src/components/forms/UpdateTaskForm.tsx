import { Select } from '@headlessui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useRef } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { TASK_STATUS } from '../../const/task'
import {
  UpdateTaskSchema,
  updateTaskSchema,
} from '../../schemas/updateTaskSchema'
import { useGetProjectsQuery } from '../../store/project/projectApi'
import {
  useDeleteTaskMutation,
  useGetTaskQuery,
  useUpdateTaskMutation,
} from '../../store/task/taskApi'
import { cn } from '../../utils/cn'
import { showError } from '../../utils/showError'
import { Loader } from '../Loader/Loader'

interface Props {
  className?: string
  onActionEnd?: () => void
  taskId: number
  projectId: number
}

export const UpdateTaskForm = ({
  className,
  taskId,
  onActionEnd,
  projectId,
}: Props) => {
  const {
    data,
    isLoading: projectLoading,
    isError,
    error,
  } = useGetProjectsQuery(null)
  const {
    data: taskData,
    isLoading: taskLoading,
    isError: isTaskError,
    error: taskError,
  } = useGetTaskQuery(taskId)
  const [updateTask, { isLoading }] = useUpdateTaskMutation()
  const [deleteTask, { isLoading: deleteLoading }] = useDeleteTaskMutation()
  const ref = useRef<HTMLInputElement | null>(null)

  const {
    register,
    handleSubmit,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    formState: { errors },
  } = useForm<UpdateTaskSchema>({
    resolver: zodResolver(updateTaskSchema),
  })

  useEffect(() => {
    if (isError || isTaskError) {
      showError(isError ? error : taskError)
      onActionEnd?.()
    }
  }, [isError, isTaskError])

  const onSubmit: SubmitHandler<UpdateTaskSchema> = async ({
    description,
    data,
    status,
    updatedProjectId,
  }) => {
    let date: string | undefined

    if (ref.current && ref.current.value) {
      const iso = new Date(ref.current.value).toISOString()

      date =
        iso?.slice(0, iso?.indexOf('T')) +
        ' ' +
        iso?.slice(iso?.indexOf('T') + 1, iso?.indexOf('.'))
    }

    console.log(description, data, status, updatedProjectId)

    try {
      await updateTask({
        id: taskId,
        updatedProjectId,
        status,
        description,
        data,
        ...(date && { deadline: date }),
      }).unwrap()
      onActionEnd?.()
    } catch (error) {
      showError(error)
    }
  }

  const onTaskDelete = async () => {
    try {
      await deleteTask(taskId).unwrap()
    } catch (error) {
      showError(error)
    }
  }

  if (projectLoading || taskLoading || !data || !taskData) return <Loader />

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn('py-6 px-4 bg-white rounded-[10px] w-[500px]', className)}
    >
      <h1 className="font-medium text-[28px] mb-8">Task:</h1>

      <fieldset
        className="p-0 bg-none border-none"
        disabled={isLoading || deleteLoading}
      >
        <div className="px-4 ">
          <label className=" rounded-[10px] px-3 w-full border-[1px] border-[#b0b0b0] block mb-14 pb-1">
            <span className="text-[#6d6d6d] capitalize block">Name</span>
            <input
              defaultValue={taskData.data}
              required
              {...register('data')}
              type="text"
              className="border-none bg-none focus:outline-none"
            />
          </label>

          <span className="text-xl block mb-4 capitalize">Description</span>
          <textarea
            defaultValue={taskData.description}
            {...register('description')}
            className="rounded-[10px] px-2 py-4 bg-[#eff6ed] mb-14 focus:outline-none block w-full resize-none "
          />

          <div className="flex flex-col gap-y-9 w-[350px] mb-14">
            <div className="flex items-center justify-between w-full">
              <span className="capitalize text-xl">Deadline</span>
              <input
                ref={ref}
                defaultValue={taskData.deadline}
                className="border-[1px] py-2 px-4 rounded-[10px] focus:outline-none select-none outline-none"
                type="datetime-local"
              />
            </div>
            <div className="flex items-center justify-between w-full">
              <span className="capitalize text-xl">Project</span>
              <Select
                className="w-[200px] px-4 py-2 rounded-[10px] bg-white border-[1px]"
                {...register('updatedProjectId')}
                defaultValue={projectId}
                aria-label="Project status"
              >
                {data.map(({ name, id }) => (
                  <option key={name} value={id}>
                    {name}
                  </option>
                ))}
              </Select>
            </div>

            <div className="flex items-center justify-between w-full">
              <span className="capitalize text-xl">Status</span>
              <Select
                className="w-[200px] px-4 py-2 rounded-[10px] bg-white border-[1px]"
                defaultValue={taskData.status}
                {...register('status')}
                aria-label="Project status"
                required
              >
                {TASK_STATUS.map(({ label, value }) => (
                  <option key={label} value={value}>
                    {label}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="button"
            disabled={isLoading || deleteLoading}
            onClick={onTaskDelete}
            className="disabled:cursor-not-allowed bg-none py-4 px-8 flex items-center justify-center bg-[#a377a8] rounded-lg text-white font-medium"
          >
            {!isLoading ? 'Delete task' : 'Loading...'}
          </button>

          <button
            disabled={isLoading || deleteLoading}
            className="disabled:cursor-not-allowed bg-none py-4 px-8 flex items-center justify-center bg-[#a377a8] rounded-lg text-white font-medium"
          >
            {!isLoading ? 'Update task' : 'Loading...'}
          </button>
        </div>
      </fieldset>
    </form>
  )
}
