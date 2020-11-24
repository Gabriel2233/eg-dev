import { Button, Flex, Icon } from "@chakra-ui/react";
import { Header } from "../src/components/Header";
import { VerticalLayout } from "../src/components/VerticalLayout";

import { FiArrowLeft } from "react-icons/fi";
import { useRouter } from "next/router";

export default function Login() {
  const { back } = useRouter();

  return (
    <VerticalLayout>
      <Header>
        <Button mx={4} p={4} onClick={() => back()}>
          <Icon as={FiArrowLeft} mr={2} />
          Back Home
        </Button>
      </Header>
    </VerticalLayout>
  );
}
