import { Input } from "@chakra-ui/react";

export const InputElement = ({ register, ...rest }) => {
  return (
    <Input
      my={4}
      _focus={{ borderColor: "red.400" }}
      ref={register}
      {...rest}
    />
  );
};
