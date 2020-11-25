import { Button, ButtonProps } from "@chakra-ui/react";
import { ReactNode } from "react";

export const RichButton = (props: ButtonProps) => {
  return (
    <Button mr={3} {...props}>
      {props.children}
    </Button>
  );
};
