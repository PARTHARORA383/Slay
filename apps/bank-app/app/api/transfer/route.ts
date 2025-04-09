export async function POST(req: Request) {
  const form = await req.formData(); // ✅ fix here

  const userId = form.get('userId') as string;
  const amount = form.get('amount') as string;
  const transaction_token = form.get('transaction_token') as string;

  const cookieValue = JSON.stringify({ userId, amount, transaction_token });

  const response = new Response(null, {
    status: 302,
    headers: {
      Location: '/Auth/signin',
      'Set-Cookie': `txn_session=${encodeURIComponent(cookieValue)}; Path=/; HttpOnly; SameSite=Lax`,
    },
  });

  return response;
}
