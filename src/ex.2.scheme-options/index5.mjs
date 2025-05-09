import mongoose from 'mongoose'
import { dbConfig } from '../common/dbConfig.mjs'
import chalk from 'chalk'

const userSchema = new mongoose.Schema(
  { name: { type: String } },
  {
    collation: {
      locale: 'en_US',
      strength: 1
    }
  }
)

const User = mongoose.model('user', userSchema)

async function run() {
  try {
    await mongoose.connect(dbConfig.uri, dbConfig.options)
    console.log(chalk.magentaBright('Connected to the database'))

    await User.collection.drop()

    await User.create([
      { name: 'François' },
      { name: 'Francois' },
      { name: 'José' },
      { name: 'Jose' }
    ])

    const searchResult = await User.find({ name: 'José' })
    console.log(chalk.magentaBright('Search results:'), searchResult)

    const searchResult2 = await User.find({ name: 'françois' })
    console.log(chalk.magentaBright('Search results:'), searchResult2)

    await mongoose.disconnect()
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
    await mongoose.disconnect()
  }
}

run()
