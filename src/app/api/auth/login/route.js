import { dbConnect } from '@/lib/dbConnect';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(req) {
  try {
    await dbConnect();

    const { email, password } = await req.json();

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return Response.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return Response.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // Sign JWT
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      secret,
      { expiresIn: '7d' }
    );

    // Send success response with cookie
    return new Response(JSON.stringify({ message: 'Login success' }), {
      status: 200,
      headers: {
        'Set-Cookie': `token=${token}; Path=/; HttpOnly; SameSite=Strict`,
      },
    });
  } catch (err) {
    console.error('❌ Login error:', err);
    return Response.json({ message: 'Server error' }, { status: 500 });
  }
}
