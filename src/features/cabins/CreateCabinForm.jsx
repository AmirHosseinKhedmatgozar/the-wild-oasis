/* eslint-disable react/prop-types */
import Input from "../../ui/Inpute";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import FileInput from "../../ui/FileInput";

import { useCreateCabin } from "./useCreatCabin";
import { useEditCabin } from "./useEditCabin";
import { useForm } from "react-hook-form";

function CreateCabinForm({ onCloseModal, editCabin = {} }) {
  const { creatLoading, creatMutate } = useCreateCabin();
  const { editLoading, editMutate } = useEditCabin();

  const { id: editID, ...editValues } = editCabin;
  const isEditCobin = Boolean(editID);
  const isLoading = creatLoading || editLoading;

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditCobin ? editValues : {},
  });

  const { errors } = formState;

  const onSubmit = (data) => {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditCobin) {
      editMutate(
        { newCabin: { ...data, image }, id: editID },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else
      creatMutate(
        { ...data, image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
  };

  return (
    <Form
      type={onCloseModal ? "type" : "regular"}
      onSubmit={handleSubmit(onSubmit /*,onError*/)}
    >
      <FormRow label="name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "This input cannot be empty",
          })}
        />
      </FormRow>

      <FormRow label="maxCapacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This input cannot be empty",
          })}
        />
      </FormRow>

      <FormRow label="regularPrice" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This input cannot be empty",
          })}
        />
      </FormRow>

      <FormRow label="discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", {
            required: "This input cannot be empty",
            validate: (value) => {
              value <= getValues().regularPrice ||
                "discount  of the regularPrice must be greater";
            },
          })}
        />
      </FormRow>

      <FormRow label="description" error={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "This input cannot be empty",
          })}
        />
      </FormRow>

      <FormRow label="CabinPhoto">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditCobin ? false : "this field is requared",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancell
        </Button>
        <Button disabled={isLoading} onClick={isLoading && onCloseModal}>
          {editID ? "Edit cobin" : "Creat new cobin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
