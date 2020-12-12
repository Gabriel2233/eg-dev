import {
  Badge,
  Flex,
  FlexProps,
  Heading,
  IconButton,
  IconButtonProps,
  Link as ChakraLink,
  Tag,
  TagLabel,
  Text,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { DbIdea } from "../../types/types";
import { ReadOnlyEditor } from "./ReadOnlyEditor";

export const IdeaIdentifier = ({ data }: { data: DbIdea }) => {
  const badgeScheme =
    data.difficulty === "Easy"
      ? "green"
      : data.difficulty === "Intermediate"
      ? "yellow"
      : "red";

  return (
    <Flex align="center" justify="space-between" w="full">
      <Heading size="2xl" py={6}>
        {data.name}
      </Heading>

      <Badge colorScheme={badgeScheme}>{data.difficulty}</Badge>
    </Flex>
  );
};

export const RichTextContainer = (props: FlexProps) => {
  return (
    <Flex
      w="full"
      align="start"
      justify="center"
      flexDir="column"
      my={6}
      p={2}
      {...props}
    >
      {props.children}
    </Flex>
  );
};

export const TechListItem = ({ tech }: { tech: string }) => {
  return (
    <Tag
      as={motion.div}
      colorScheme="red"
      mx={1}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <TagLabel># {tech}</TagLabel>
    </Tag>
  );
};

export const ArrowButton = (props: IconButtonProps) => {
  return (
    <IconButton
      size="lg"
      isRound={true}
      aria-label="Orienting Icon"
      pos="fixed"
      top="50%"
      {...props}
    />
  );
};

export const EditorWrapper = ({ editorValue }: { editorValue: string }) => {
  const CustomFlex = motion.custom(Flex);

  return (
    <RichTextContainer>
      <AnimatePresence>
        <CustomFlex
          boxShadow="0 4px 14px 0 #ccc"
          rounded="8px"
          p={6}
          w="full"
          flexDir="column"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            x: { type: "spring", damping: 300, stiffness: 30 },
            opacity: { duration: 0.2 },
          }}
        >
          <ReadOnlyEditor value={JSON.parse(editorValue)} />
        </CustomFlex>
      </AnimatePresence>
    </RichTextContainer>
  );
};

export const IdeaInfoSection = ({ data }: { data: DbIdea }) => {
  return (
    <Flex w="full" flexDir="column">
      <Flex my={2}>
        <Link href={`/users/${data.user.uid}`}>
          <ChakraLink mx={2} color="gray.600">
            By: {data.user.name}
          </ChakraLink>
        </Link>
      </Flex>

      <Flex my={2}>
        <Text mx={2} color="gray.600">
          Technologies:
        </Text>

        {data.techs.map((tech: string, i: number) => (
          <AnimatePresence custom={i}>
            <TechListItem tech={tech} />
          </AnimatePresence>
        ))}
      </Flex>

      <Flex my={2}>
        {data.demo_url ? (
          <ChakraLink mx={2} color="gray.600" href={data.demo_url}>
            Demo: {data.demo_placeholder}
          </ChakraLink>
        ) : (
          <Text mx={2} color="gray.600">
            Demo: Not Provided
          </Text>
        )}
      </Flex>
    </Flex>
  );
};
