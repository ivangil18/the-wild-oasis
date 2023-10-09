import supabase, { supabaseUrl } from "./supabase";

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}
export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { fullName, avatar: "" } },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  let updatedData;

  if (password) updatedData = { password };
  if (fullName) updatedData = { data: { fullName } };

  const { data, error: error1 } = await supabase.auth.updateUser(updatedData);

  if (error1) throw new Error(error1.message);

  if (!avatar) return data;

  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) {
    throw new Error("There was a problem uploading the avatar");
  }

  const avatarPath = `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`;

  const { data: avatarData, error: avatarError } =
    await supabase.auth.updateUser({ data: { avatar: avatarPath } });

  if (avatarError) {
    console.log(storageError);
    throw new Error("There was a problem upadating the avatar");
  }

  return avatarData;
}
