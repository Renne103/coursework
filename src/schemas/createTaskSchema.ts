import { z } from 'zod'

export const createTaskSchema = z.object({
  data: z.string(),
  description: z.string().optional(),
  deadline: z.coerce.date(),
})

export type CreateTaskSchema = z.infer<typeof createTaskSchema>
