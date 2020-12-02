import { Button, ButtonProps } from "@chakra-ui/react";

export const MainButton = (props: ButtonProps) => {
  return (
    <Button
      bg="red.500"
      _hover={{ bg: "red.400" }}
      color="white"
      {...props}
      mx={2}
    >
      {props.children}
    </Button>
  );
};
