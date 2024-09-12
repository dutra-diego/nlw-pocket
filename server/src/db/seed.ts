import { client, db } from '.'
import { goalCompletions, goals } from './schema'
import dayjs from 'dayjs'

async function seed() {
  await db.delete(goalCompletions)
  await db.delete(goals)

  const result = await db
    .insert(goals)
    .values([
      {
        title: 'Acordar cedo',
        desiredWeeklyFrequency: 5,
      },
      {
        title: 'Me exercitar',
        desiredWeeklyFrequency: 3,
      },
      {
        title: 'Meditar',
        desiredWeeklyFrequency: 2,
      },
    ])
    .returning()

  const startofWeek = dayjs().startOf('week')

  await db.insert(goalCompletions).values([
    { goalId: result[0].id, createdAt: startofWeek.toDate() },
    { goalId: result[1].id, createdAt: startofWeek.add(1, 'day').toDate() },
  ])
}

seed().finally(() => {
  client.end()
})
