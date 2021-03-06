import { Grid } from "@chakra-ui/react";
import { ReactNode } from "react";

export const RichToolbar = ({ children }: { children: ReactNode }) => {
  return (
    <Grid
      w="full"
      templateColumns={"repeat(auto-fit, minmax(60px, 1fr))"}
      roundedTop="4px"
      align="center"
      justify="start"
      p={2}
      borderWidth={1}
    >
      {children}
    </Grid>
  );
};
