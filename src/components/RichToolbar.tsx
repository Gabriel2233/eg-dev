import { Flex, Grid } from "@chakra-ui/react";
import { ReactNode } from "react";

export const RichToolbar = ({ children }: { children: ReactNode }) => {
  return (
    <Grid
      w="full"
      templateColumns={"repeat(auto-fit, minmax(25px, 1fr))"}
      roundedTop="4px"
      align="center"
      justify="start"
      p={2}
      background="gray.200"
    >
      {children}
    </Grid>
  );
};
