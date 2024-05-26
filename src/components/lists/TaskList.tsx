import { useEffect, useState } from 'react'
import { useGetTasksQuery } from '../../store/task/taskApi'
import { TaskStatus } from '../../store/task/types'
import { cn } from '../../utils/cn'
import { showError } from '../../utils/showError'
import { Loader } from '../Loader/Loader'
import { Task } from '../Task/Task'

interface Props {
  className?: string
  projectId: number
}

export const TaskList = ({ className, projectId }: Props) => {
  const { data, isLoading, isFetching, isError, error } = useGetTasksQuery({ projectId })
  const [filter, setFilter] = useState<'all' | 'active' | 'complteted'>('all')

  useEffect(() => {
    if (isError) {
      showError(error)
    }
  }, [isError])


  if (isError) return null
  if (isLoading  || isFetching || !data)
    return (
      <div className="px-4 flex items-center justify-center">
        <Loader className='[&>div]:bg-white' />
      </div>
    )

  const onSetFilter = (value: 'all' | 'active' | 'complteted') => {
    setFilter(value)
  }

  const filteredData = data.filter(t =>
    filter === 'all'
      ? t
      : filter === 'active'
      ? t.status === TaskStatus.BACKLOG
      : t.status === TaskStatus.DONE
  )

  return (
    <>
      <ul
        className={cn(
          'flex flex-col gap-y-4 max-h-[300px] overflow-auto py-[10px] mb-[5px]',
          className
        )}
      >
        {filteredData.map(t => (
          <li key={t.id}>
            <Task projectId={projectId} {...t} />
          </li>
        ))}
      </ul>
      {/*<div className="flex items-center justify-between px-4">
        <button
          onClick={onSetFilter.bind(null, 'all')}
          className="w-[100px] bg-[#5e9357] flex items-center hover:bg-[#1f401c] transition-colors duration-300 ease justify-center rounded-[10px] text-white font-medium py-3"
        >
          All
        </button>
        <button
          onClick={onSetFilter.bind(null, 'active')}
          className="w-[100px] bg-[#5e9357] flex items-center   hover:bg-[#1f401c] transition-colors duration-300 justify-center rounded-[10px] text-white font-medium py-3"
        >
          Active
        </button>
        <button
          onClick={onSetFilter.bind(null, 'complteted')}
          className="w-[100px] bg-[#5e9357] flex items-center justify-center  hover:bg-[#1f401c] transition-colors duration-300  rounded-[10px] text-white font-medium py-3"
        >
          Completed
        </button>
      </div>*/}
    </>
  )
}
