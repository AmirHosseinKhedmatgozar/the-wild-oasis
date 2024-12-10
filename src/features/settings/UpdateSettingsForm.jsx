import { useGetSettings } from "./useGetSettings";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Inpute";
import Spinner from "../../ui/Spinner";
import { useEditSettings } from "./useEditSettings";

function UpdateSettingsForm() {
  const {
    settings: {
      minBookingLength,
      maxBookingLength,
      maxGuestsPerBooking,
      breackfastPrice,
    } = {},
    settingsLoading,
  } = useGetSettings();

  const { settingsEditLoading, settingsMutate } = useEditSettings();

  if (settingsLoading) return <Spinner />;

  function handleOnBlure(e, feild) {
    const { value } = e.target;
    if (!value) return;
    settingsMutate({ [feild]: value });
  }

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          disabled={settingsEditLoading}
          onBlur={(e) => {
            handleOnBlure(e, "minBookingLength");
          }}
        />
      </FormRow>

      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          disabled={settingsEditLoading}
          onBlur={(e) => {
            handleOnBlure(e, "maxBookingLength");
          }}
        />
      </FormRow>

      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          disabled={settingsEditLoading}
          onBlur={(e) => {
            handleOnBlure(e, "maxGuestsPerBooking");
          }}
        />
      </FormRow>

      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breackfastPrice}
          disabled={settingsEditLoading}
          onBlur={(e) => {
            handleOnBlure(e, "breackfastPrice");
          }}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
