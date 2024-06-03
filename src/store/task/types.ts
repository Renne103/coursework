export enum TaskStatus {
  BACKLOG = 'BACKLOG',
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export interface Task {
  id: number
  data: string
  deadline: string
  status: TaskStatus
  description?: string
}

export type GetTasksResponse = Task[]
export interface GetTasksRequest {
  projectId: number
  page?: number
}

export type GetTasksByFilterResponse = Task[]
export interface GetTasksByFilterRequest {
  deadline?: {
    dateFrom: string
    dateTo: string
  }
  status?: TaskStatus,
  page?: number,
  projectIds: number[]
}

export interface CreateTaskResponse extends Omit<Task, 'status' | 'id'> {}
export interface CreateTaskRequest
  extends Pick<Task, 'data' | 'deadline' | 'description'> {
  projectId: number
}

export interface UpdateTaskResponse {
  id: number
}

export interface UpdateTaskRequest
  extends Partial<Pick<Task, 'deadline' | 'description'>> {
  id: number
  data: string
  status: TaskStatus
  updatedProjectId?: number
}
export interface DeleteTaskResponse {
  id: number
}
