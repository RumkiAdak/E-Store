export async function POST() {
  return new Response(JSON.stringify({ message: 'Logout success' }), {
    status: 200,
    headers: {
      'Set-Cookie': `token=; Path=/; HttpOnly; Max-Age=0; SameSite=Strict`,
    },
  });
}
