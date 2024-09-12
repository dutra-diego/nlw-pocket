import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getWeekPendingGoals } from '../../functions/get-week-peding-goal'

export const getPendingGoalsRoute: FastifyPluginAsyncZod = async app => {
  app.get('/peding-goals', async () => {
    const { pedingGoals } = await getWeekPendingGoals()
    return { pedingGoals }
  })
}
