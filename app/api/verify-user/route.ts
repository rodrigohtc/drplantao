import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email } = await request.json();

  // Aqui você deve implementar a lógica para verificar se o usuário existe no seu backend
  // Por exemplo, fazendo uma chamada para seu banco de dados ou serviço de autenticação

  const userExists = await checkUserInDatabase(email);

  if (userExists) {
    return NextResponse.json({ status: 'success' });
  } else {
    return NextResponse.json(
      { status: 'error', message: 'Usuário não encontrado' },
      { status: 404 }
    );
  }
}

async function checkUserInDatabase(email: string): Promise<boolean> {
  console.log(email);
  return true;
}
