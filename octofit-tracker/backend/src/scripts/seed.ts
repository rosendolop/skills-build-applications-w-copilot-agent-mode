import mongoose from 'mongoose'
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js'

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db'

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString)

    console.log('Connected to octofit_db')

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ])

    const users = await User.insertMany([
      { username: 'alex.runner', email: 'alex.runner@example.com', displayName: 'Alex Rivera' },
      { username: 'jamie.lift', email: 'jamie.lift@example.com', displayName: 'Jamie Chen' },
      { username: 'taylor.yoga', email: 'taylor.yoga@example.com', displayName: 'Taylor Morgan' },
    ])

    await Team.insertMany([
      { name: 'Morning Momentum', members: [users[0]._id, users[1]._id] },
      { name: 'Wellness Collective', members: [users[1]._id, users[2]._id] },
    ])

    await Activity.insertMany([
      { userId: users[0]._id, type: 'Running', durationMinutes: 32, completedAt: new Date('2026-09-08T07:15:00Z') },
      { userId: users[1]._id, type: 'Strength training', durationMinutes: 45, completedAt: new Date('2026-09-08T18:00:00Z') },
      { userId: users[2]._id, type: 'Yoga', durationMinutes: 28, completedAt: new Date('2026-09-09T06:45:00Z') },
    ])

    await Leaderboard.insertMany([
      { userId: users[0]._id, points: 860, rank: 1 },
      { userId: users[1]._id, points: 745, rank: 2 },
      { userId: users[2]._id, points: 690, rank: 3 },
    ])

    await Workout.insertMany([
      {
        name: 'Starter Cardio Circuit',
        description: 'A low-impact circuit to build steady cardiovascular endurance.',
        difficulty: 'beginner',
        durationMinutes: 20,
      },
      {
        name: 'Full Body Strength',
        description: 'A balanced session focused on foundational compound movements.',
        difficulty: 'intermediate',
        durationMinutes: 40,
      },
      {
        name: 'Power and Mobility',
        description: 'An advanced blend of explosive movement and controlled mobility work.',
        difficulty: 'advanced',
        durationMinutes: 50,
      },
    ])

    console.log('Database seeding complete')
    await mongoose.disconnect()
  } catch (error) {
    console.error('Error seeding database:', error)
    await mongoose.disconnect()
    process.exit(1)
  }
}

void seedDatabase()
