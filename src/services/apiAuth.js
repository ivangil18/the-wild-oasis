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

// ME QUEDE POR AQUI ---> REVIEW API AND CREATE CUSTOM HOOK TO USE IT!!!!

export async function userUpdate(fullName, avatar) {
  console.log(fullName, avatar);

  // // check if there is an avatar received in the user data and where it is comming from (database or user input)
  const hasAvatarPath = avatar?.name.startsWith?.(supabaseUrl);
  console.log(hasAvatarPath);

  //define image unique name
  const avatarName = `${Math.random()}-${avatar?.name}`.replaceAll("/", "");
  console.log(avatarName);
  // define image path in storge bucket
  const avatarPath = hasAvatarPath
    ? avatar
    : `${supabaseUrl}/storage/v1/object/public/avatars/${avatarName}`;

  console.log(avatarPath);

  let query = await supabase.auth;

  if (avatar)
    query = query.updateUser({
      data: { avatar: avatarPath, fullName: fullName },
    });

  if (!avatar)
    query = query.updateUser({
      data: { fullName: fullName },
    });

  // const { data, error } = await supabase.auth.updateUser({
  //   data: { avatar: avatar ? avatarPath : "", fullName: fullName },
  // });

  if (query.error) {
    console.log(query.error);
    throw new Error("User could not be updated");
  }

  // 2. Upload image
  if (hasAvatarPath || !avatar) return;
  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(avatarName, avatar);

  if (storageError) {
    console.log(storageError);
    throw new Error("There was a problem uploading the avatar");
  }

  console.log(query.data);

  return query.data;
}
