import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be found");
  }

  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Cabin could not be deleted");
  }
}

export async function createCabin(newCabin) {
  //define image unique name
  const imageName = `${Math.random()}-${newCabin.image.name}`.replace("/", "");

  // define image path in storge bucket
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  // https://qjivsaxsizwgxzqzzgiq.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  console.log({ ...newCabin, image: imagePath });
  console.log(imagePath);

  // 1. create cabin
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select();

  if (error) {
    console.log(error);
    throw new Error("Cabin could not be created");
  }

  // 2. Upload image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. Delete the cabin if there was an error uploading the corresponding image
  if (storageError) {
    console.log(storageError);
    await supabase.from("cabins").delete().eq("id", data.id);
    console.log(storageError);
    throw new Error(
      "Cabin image could not be uploaded therefor the cabin was not created"
    );
  }

  return data;
}
