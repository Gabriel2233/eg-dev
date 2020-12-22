import {
  Badge,
  Button,
  Flex,
  FlexProps,
  Heading,
  Icon,
  IconButton,
  IconButtonProps,
  Link as ChakraLink,
  Tag,
  TagLabel,
  Text,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { FiHeart } from "react-icons/fi";
import { DbIdea } from "../../types/types";
import { useFavorites } from "../contexts/FavoritesContext";
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
          <AnimatePresence custom={i} key={i}>
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

export const FullIdea = ({ data }: { data: DbIdea }) => {
  const { favorites, onIdeaLike } = useFavorites();

  const checkPresence = () => {
    return favorites.includes(data.id);
  };

  const [isFavorited, setIsFavorited] = useState(null);

  useEffect(() => {
    const value = checkPresence();

    if (value) {
      setIsFavorited(true);
    } else {
      setIsFavorited(false);
    }
  }, [favorites]);

  return (
    <Flex width="70%" p={8} flexDir="column">
      <IdeaIdentifier data={data} />

      <Flex w="full" justify="space-between">
        <IdeaInfoSection data={data} />
        <Button
          size="md"
          variant="ghost"
          colorScheme="red"
          onClick={() => onIdeaLike(data.id)}
        >
          <Icon
            as={isFavorited ? AiFillHeart : FiHeart}
            color={isFavorited ? "red.500" : "black"}
          />{" "}
        </Button>
      </Flex>

      <RichTextContainer>
        <EditorWrapper editorValue={data.richDescription} />
      </RichTextContainer>
    </Flex>
  );
};
