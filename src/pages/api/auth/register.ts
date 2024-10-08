import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const name = formData.get("name")?.toString();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const phone = formData.get("phone")?.toString();

  if (!name || !email || !password || !phone) {
    return new Response("Nome, email, senha e celular são obrigatórios", { status: 400 });
  }

  // Etapa 1: Registrar o usuário no Supabase com metadados
  const { user, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name, // Armazenar o nome em user_metadata
        phone, // Inicialmente armazena o celular em user_metadata
      },
    },
  });

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  // Etapa 2: Atualizar o campo phone diretamente na tabela auth.users
  if (user) {
    const { error: updateError } = await supabase
      .from('auth.users')
      .update({ phone })
      .eq('id', user.id);

    if (updateError) {
      return new Response(updateError.message, { status: 500 });
    }
  }

  // Redireciona o usuário para a página de login
  return redirect("/signin");
};
