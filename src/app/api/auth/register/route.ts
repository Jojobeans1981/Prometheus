import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { connectToDatabase } from '../../../../../lib/mongodb'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json()

    // Validate input
    if (!email || !password || !name) {
      return NextResponse.json(
        { message: 'Email, password, and name are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Validate password strength
    if (password.length < 6) {
      return NextResponse.json(
        { message: 'Password must be at least 6 characters long' },
        { status: 400 }
      )
    }

    // Connect to database
    const { db } = await connectToDatabase()
    const users = db.collection('users')

    // Check if user already exists
    const existingUser = await users.findOne({ email: email.toLowerCase() })
    if (existingUser) {
      return NextResponse.json(
        { message: 'User with this email already exists' },
        { status: 409 }
      )
    }

    // Hash password
    const saltRounds = 12
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // Create new user
    const newUser = {
      email: email.toLowerCase(),
      password: hashedPassword,
      name: name.trim(),
      subscription: 'free',
      createdAt: new Date(),
      lastLogin: new Date(),
      isEmailVerified: false
    }

    const result = await users.insertOne(newUser)

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: result.insertedId,
        email: newUser.email 
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    // Return user data (without password) and token
    const userData = {
      id: result.insertedId,
      email: newUser.email,
      name: newUser.name,
      subscription: newUser.subscription
    }

    return NextResponse.json({
      message: 'Registration successful',
      token,
      user: userData
    }, { status: 201 })

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}