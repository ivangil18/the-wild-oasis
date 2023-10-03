import supabase from "./supabase";

export async function login({ email, password }) {
  console.log(email, password);
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  console.log(data);
  if (error) throw new Error(error.message);

  return data;
}
