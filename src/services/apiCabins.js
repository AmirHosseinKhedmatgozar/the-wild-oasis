import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error("cobins not be loaded");
    throw new Error("cobins not be loaded");
  }
  return data;
}
export async function deleteCobin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error("cobin could not deleted");
    throw new Error("cobin could not deleted");
  }
  return { data };
}

export async function creatEditCabin(newCabin, id) {
  //create img
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const hasImagePatch = newCabin.image?.startsWith?.(supabaseUrl);

  const imagePath = hasImagePatch
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cobins-images/${imageName}`;

  let query = supabase.from("cabins");

  //1.add new cobin
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  //2.update cobin
  if (id) {
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error("cobin could not created");
    throw new Error("cobin could not created");
  }

  if (hasImagePatch) return data;

  const { error: storageError } = await supabase.storage
    .from("cobins-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }

  return data;
}
