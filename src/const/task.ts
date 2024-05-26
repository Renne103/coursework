import { TaskStatus } from '../store/task/types'

export const TASK_STATUS: { label: string; value: TaskStatus }[] = [
  {
    label: 'backlog',
    value: TaskStatus.BACKLOG,
  },
  {
    label: 'todo',
    value: TaskStatus.TODO,
  },
  {
    label: 'in progress',
    value: TaskStatus.IN_PROGRESS,
  },
  {
    label: 'done',
    value: TaskStatus.DONE,
  },
]
