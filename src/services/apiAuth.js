import supabase, { supabaseUrl } from "./supabase";

export default async function loginUser({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);
  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function loguot() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function signUp({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: { data: { fullName, avatar: "" } },
  });

  if (error) throw new Error(error.message);
  return data;
}

export async function updateUser({ password, fullName, avatar }) {
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };
  //1.update user whithout avatar!
  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) throw new Error(error.message);
  if (!avatar) return data;
  //2.upload avatar in your bocket
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: storageError } = supabase.storage
    .from("avatar")
    .upload(fileName, avatar);
  if (storageError) throw new Error(storageError.message);
  //3.update avatar
  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatar/${fileName}`,
    },
  });
  if (error2) throw new Error(error2.message);
  return updatedUser;
}
