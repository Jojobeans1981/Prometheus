import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { connectToDatabase } from '../../../../../lib/mongodb'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: 'No token provided' },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7)

    try {
      // Verify token
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: string }
      
      // Connect to database
      const { db } = await connectToDatabase()
      
      // Add token to blacklist (optional - for enhanced security)
      const blacklistedTokens = db.collection('blacklisted_tokens')
      await blacklistedTokens.insertOne({
        token,
        userId: decoded.userId,
        blacklistedAt: new Date(),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
      })

      // Update user's last logout time
      const users = db.collection('users')
      await users.updateOne(
        { _id: decoded.userId },
        { $set: { lastLogout: new Date() } }
      )

      return NextResponse.json({
        message: 'Logout successful'
      })

    } catch (jwtError) {
      return NextResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      )
    }

  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}