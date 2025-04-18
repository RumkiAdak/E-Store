import { dbConnect } from '@/lib/dbConnect';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  try {
    await dbConnect();
    const { name, email, password } = await req.json();

    console.log("Registering user:", { name, email });

    const existing = await User.findOne({ email });
    if (existing) {
      return Response.json({ message: 'User already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    console.log("✅ User created:", user);

    return Response.json({ message: 'User created', user }, { status: 201 });
  } catch (err) {
    console.error("❌ Error in register route:", err);
    return Response.json({ message: 'Server error' }, { status: 500 });
  }
}
