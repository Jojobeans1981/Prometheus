import { MongoClient, Db } from 'mongodb'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/prometheus'
const MONGODB_DB = process.env.MONGODB_DB || 'prometheus'

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable')
}

interface MongoConnection {
  client: MongoClient
  db: Db
}

let cachedConnection: MongoConnection | null = null

export async function connectToDatabase(): Promise<MongoConnection> {
  if (cachedConnection) {
    return cachedConnection
  }

  try {
    const client = new MongoClient(MONGODB_URI)
    await client.connect()
    
    const db = client.db(MONGODB_DB)
    
    cachedConnection = { client, db }
    
    console.log('Connected to MongoDB')
    return cachedConnection
  } catch (error) {
    console.error('MongoDB connection error:', error)
    throw error
  }
}

// Utility function to close connection (useful for cleanup)
export async function closeConnection(): Promise<void> {
  if (cachedConnection) {
    await cachedConnection.client.close()
    cachedConnection = null
    console.log('MongoDB connection closed')
  }
}