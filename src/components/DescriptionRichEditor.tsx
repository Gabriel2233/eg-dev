import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useMemo,
  useState,
} from "react";
import { chakra, Flex, CodeProps } from "@chakra-ui/react";
import { RichButton } from "./RichButton";

import { createEditor, Editor, Node, Transforms } from "slate";
import { Slate, Editable, withReact } from "slate-react";

export const DescriptionRichEditor = () => {
  const editor = useMemo(() => withReact(createEditor()), []);

  const [value, setValue] = useState([
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph." }],
    },
  ]);

  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case "code":
        return <CodeElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  const toggleCode = (e: FormEvent) => {
    e.preventDefault();

    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === "code",
    });

    Transforms.setNodes(
      editor,
      { type: match ? "paragraph" : "code" },
      { match: (n) => Editor.isBlock(editor, n) }
    );
  };

  return (
    <chakra.div
      maxH="300px"
      w="full"
      borderWidth={1}
      borderColor="gray.200"
      rounded="4px"
      _focus={{ borderColor: "yellow.400" }}
      p={6}
    >
      <Slate
        editor={editor}
        value={value}
        onChange={(newValue) => setValue(newValue as any)}
      >
        <Flex w="full" align="center" justify="center">
          <RichButton onClick={(e) => toggleCode(e)}>{"{ }"}</RichButton>
        </Flex>
        <Editable
          renderElement={renderElement}
          onKeyDown={(event) => {
            if (event.key === "&") {
              event.preventDefault();
              editor.insertText("and");
            }
          }}
        />
      </Slate>
    </chakra.div>
  );
};

const CodeElement = (props: HTMLPreElement) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};

const DefaultElement = (props: HTMLParagraphElement) => {
  return <p {...props.attributes}>{props.children}</p>;
};
