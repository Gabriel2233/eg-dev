import {
  Button,
  Code,
  Heading,
  Icon,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";
import { IconType } from "react-icons/lib";
import { Editor, Element as SlateElement, Transforms, Node } from "slate";
import { useSlate } from "slate-react";

const LIST_TYPES = ["numbered-list", "bulleted-list"];

export const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n: Node) =>
      LIST_TYPES.includes(
        !Editor.isEditor(n) && SlateElement.isElement(n) && (n.type as string)
      ),
    split: true,
  });
  const newProperties: Partial<SlateElement> = {
    type: isActive ? "paragraph" : isList ? "list-item" : format,
  };
  Transforms.setNodes(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }

  console.log();
};

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: (n: Node) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format,
  });

  return !!match;
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case "block-quote":
      return <blockquote {...attributes}>{children}</blockquote>;
    case "bulleted-list":
      return <UnorderedList {...attributes}>{children}</UnorderedList>;
    case "heading-one":
      return (
        <Heading size="xl" {...attributes}>
          {children}
        </Heading>
      );
    case "heading-two":
      return <h2 {...attributes}>{children}</h2>;
    case "list-item":
      return <li {...attributes}>{children}</li>;
    case "numbered-list":
      return <OrderedList {...attributes}>{children}</OrderedList>;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = (
      <Code p={2} bg="blue.800" color="white">
        {children}
      </Code>
    );
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

const BlockButton = ({ format, icon }: { format: string; icon: IconType }) => {
  const editor = useSlate();

  return (
    <Button
      onClick={() => {
        toggleBlock(editor, format);
      }}
      size="sm"
      mr={3}
      bg="white"
      borderWidth={2}
      fontSize="lg"
      borderColor="gray.200"
      _hover={{ bg: "white", borderColor: "yellow.400" }}
    >
      <Icon as={icon} />
    </Button>
  );
};

const MarkButton = ({ format, icon }: { format: string; icon: IconType }) => {
  const editor = useSlate();
  return (
    <Button
      onClick={() => {
        toggleMark(editor, format);
      }}
      size="sm"
      mr={3}
      bg="white"
      borderWidth={2}
      fontSize="sm"
      borderColor="gray.200"
      _hover={{ bg: "white", borderColor: "yellow.400" }}
    >
      <Icon as={icon} />
    </Button>
  );
};

export const RichComponents = {
  Element,
  Leaf,
  BlockButton,
  MarkButton,
};
