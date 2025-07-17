import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { connectToDatabase } from '../../../../../lib/mongodb'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Connect to database
    const { db } = await connectToDatabase()
    const users = db.collection('users')

    // Find user by email
    const user = await users.findOne({ email: email.toLowerCase() })
    if (!user) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user._id,
        email: user.email 
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    // Update last login
    await users.updateOne(
      { _id: user._id },
      { $set: { lastLogin: new Date() } }
    )

    // Return user data (without password) and token
    const userData = {
      id: user._id,
      email: user.email,
      name: user.name,
      subscription: user.subscription || 'free'
    }

    return NextResponse.json({
      message: 'Login successful',
      token,
      user: userData
    })

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}