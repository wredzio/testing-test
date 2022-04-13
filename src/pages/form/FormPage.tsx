import React from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import {
  Button,
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import { StringOrNumber } from "@chakra-ui/utils";

interface FormPageProps {}

type UserId = string;
type GroupId = string;
type All = "all";

interface FormModel {
  users: UserId[] | All;
  groups?: GroupId[] | All;
}

const onSubmit: SubmitHandler<FormModel> = async (data: FormModel) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(data);
      resolve(data);
    }, 3000);
  });
};

const formSchema = yup
  .object({
    users: yup.lazy((val) =>
      Array.isArray(val)
        ? yup.array().of(yup.string()).required("Required")
        : yup.string().required("Required").oneOf(["all"], "Should be all")
    ),
    groups: yup.lazy((val) =>
      Array.isArray(val)
        ? yup.array().of(yup.string())
        : yup.string().oneOf(["all"])
    ),
  })
  .defined();

const users = [
  { userId: "user1", name: "Naruto" },
  { userId: "user2", name: "Sasuke" },
  { userId: "user3", name: "Kakashi" },
];

const getValue = (newValue: StringOrNumber[], oldValue?: string[] | "all") => {
  if (newValue.indexOf("all") !== -1) {
    if (oldValue && oldValue.length !== newValue.length - 1) {
      return newValue.filter((a) => a !== "all");
    }

    return "all";
  }

  return newValue.filter((a) => a !== "all");
};

export const FormPage: React.FC<FormPageProps> = (props) => {
  const form = useForm<FormModel>({ resolver: yupResolver(formSchema) });
  const {
    register,
    control,
    getValues,
    formState: { errors, isSubmitting, touchedFields },
  } = form;

  console.log(getValues());

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <FormControl isInvalid={!!errors.users}>
          <FormLabel htmlFor="users">First name</FormLabel>
          <Controller
            control={control}
            name={"users"}
            render={({ field: { onChange, value, ref } }) => (
              <CheckboxGroup
                value={
                  value === "all"
                    ? ["all", ...users.map((u) => u.userId)]
                    : value
                }
                onChange={(newValue) => {
                  console.log(value);
                  onChange(getValue(newValue, value));
                }}
                colorScheme="green"
              >
                <Stack spacing={[1, 5]} direction={"row"}>
                  <Checkbox value="all">All</Checkbox>
                  {users.map((u) => (
                    <Checkbox value={u.userId}>{u.name}</Checkbox>
                  ))}
                </Stack>
              </CheckboxGroup>
            )}
          />

          <FormErrorMessage>
            {errors.users && Array.isArray(errors.users)
              ? errors.users[0].message
              : errors.users?.message}
          </FormErrorMessage>
        </FormControl>
        <Button
          mt={4}
          colorScheme="teal"
          isLoading={isSubmitting}
          type="submit"
        >
          Submit
        </Button>
      </form>
    </FormProvider>
  );
};
