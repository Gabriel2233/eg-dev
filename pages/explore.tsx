import { Box, Grid } from "@chakra-ui/react";
import { DashboardHeader } from "../src/components/DashboardHeader";
import { ExploreIdeaCard } from "../src/components/ExploreIdeaCard";

export default function Explore() {
  return (
    <Box h="100%" bg="gray.100">
      <DashboardHeader />
      <Grid
        gap={20}
        templateColumns="repeat(auto-fit, minmax(300px, 1fr))"
        bg="red"
        maxW="980px"
        m="auto"
        w="90%"
        py="3rem"
      >
        <ExploreIdeaCard />
        <ExploreIdeaCard />
        <ExploreIdeaCard />
        <ExploreIdeaCard />
      </Grid>
    </Box>
  );
}
