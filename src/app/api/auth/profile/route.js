import { dbConnect } from '@/lib/dbConnect';
import User from '@/models/User';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function GET() {
  try {
    await dbConnect();
    const token = cookies().get('token')?.value;
    if (!token) return Response.json({ message: 'Unauthorized' }, { status: 401 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    return Response.json({
      user: {
        name: user.name,
        email: user.email,
      },
      cart: user.cart || [],
    });
  } catch (err) {
    console.error('❌ Error fetching profile:', err);
    return Response.json({ message: 'Unauthorized' }, { status: 401 });
  }
}
