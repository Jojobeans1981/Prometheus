import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { connectToDatabase } from '../../../../../lib/mongodb'
import { ObjectId } from 'mongodb'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

export async function GET(request: NextRequest) {
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
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: string, email: string }
      
      // Connect to database
      const { db } = await connectToDatabase()
      
      // Check if token is blacklisted
      const blacklistedTokens = db.collection('blacklisted_tokens')
      const isBlacklisted = await blacklistedTokens.findOne({ token })
      
      if (isBlacklisted) {
        return NextResponse.json(
          { message: 'Token has been invalidated' },
          { status: 401 }
        )
      }

      // Get user data
      const users = db.collection('users')
      const user = await users.findOne(
        { _id: new ObjectId(decoded.userId) },
        { projection: { password: 0 } } // Exclude password
      )

      if (!user) {
        return NextResponse.json(
          { message: 'User not found' },
          { status: 404 }
        )
      }

      // Return user data
      const userData = {
        id: user._id,
        email: user.email,
        name: user.name,
        subscription: user.subscription || 'free',
        isEmailVerified: user.isEmailVerified || false,
        createdAt: user.createdAt,
        lastLogin: user.lastLogin
      }

      return NextResponse.json(userData)

    } catch (jwtError) {
      return NextResponse.json(
        { message: 'Invalid or expired token' },
        { status: 401 }
      )
    }

  } catch (error) {
    console.error('Auth verification error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}