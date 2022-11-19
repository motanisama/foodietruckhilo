import { forwardRef } from "react";
import {
  Button,
  Box,
  SimpleGrid,
  useRadio,
  useRadioGroup,
} from "@chakra-ui/react";
import { useController } from "react-hook-form";
import { IoFastFood } from "react-icons/io";
import { MdAccessTimeFilled, MdUpdate, MdFastfood } from "react-icons/md";

const CustomRadio = forwardRef(({ children, ...props }, ref) => {
  const { state, getInputProps, getCheckboxProps } = useRadio(props);
  const input = getInputProps({ ref });
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Button
        leftIcon={props.icon}
        as="div"
        {...checkbox}
        cursor="pointer"
        backgroundColor={state.isChecked ? "red.400" : "grey"}
        color={"white"}
        variant={state.isChecked ? null : "outline"}
      >
        {children}
      </Button>
    </Box>
  );
});

export const Toggle = forwardRef(
  ({ control, name, defaultValue, ...props }, ref) => {
    const { field } = useController({
      name,
      control,
      rules: { required: "Toggle is required" },
      defaultValue,
    });

    const { getRootProps, getRadioProps } = useRadioGroup({
      ...field,
    });

    return (
      <Box {...getRootProps()}>
        <CustomRadio
          icon={<MdFastfood size={"1em"} />}
          {...getRadioProps({ value: "Special" })}
        >
          Special
        </CustomRadio>
        <CustomRadio
          icon={<MdAccessTimeFilled size={"1em"} />}
          {...getRadioProps({ value: "Hours" })}
        >
          Hours
        </CustomRadio>
      </Box>
    );
  }
);
