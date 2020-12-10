import React, { useCallback, useMemo, useState } from "react";
import { chakra, Code } from "@chakra-ui/react";

import { createEditor, Node, Text } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { RichToolbar } from "./RichToolbar";
import { RichComponents } from "../utils/slateUtils";

import { FiBold, FiCode, FiItalic, FiUnderline } from "react-icons/fi";
import { AiOutlineOrderedList, AiOutlineUnorderedList } from "react-icons/ai";
import { BiHeading } from "react-icons/bi";

export const DescriptionRichEditor = ({
  value,
  onChange,
}: {
  value: Node[];
  onChange(newValue: Node[]): void;
}) => {
  const renderElement = useCallback(
    (props) => <RichComponents.Element {...props} />,
    []
  );
  const renderLeaf = useCallback(
    (props) => <RichComponents.Leaf {...props} />,
    []
  );
  const editor = useMemo(() => withReact(createEditor()), []);

  return (
    <>
      <Slate editor={editor} value={value} onChange={onChange}>
        <RichToolbar>
          <RichComponents.MarkButton format="bold" icon={FiBold} />
          <RichComponents.MarkButton format="italic" icon={FiItalic} />
          <RichComponents.MarkButton format="underline" icon={FiUnderline} />
          <RichComponents.MarkButton format="code" icon={FiCode} />

          <RichComponents.BlockButton format="heading-one" icon={BiHeading} />
          <RichComponents.BlockButton
            format="numbered-list"
            icon={AiOutlineOrderedList}
          />
          <RichComponents.BlockButton
            format="bulleted-list"
            icon={AiOutlineUnorderedList}
          />
        </RichToolbar>

        <chakra.div
          h="200px"
          maxH="300px"
          overflowY="auto"
          w="full"
          borderWidth={1}
          borderColor="gray.200"
          roundedBottom="4px"
          p={4}
        >
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            placeholder="How will the app work, what are some tips and tricks to make this idea become reality..."
          />
        </chakra.div>
      </Slate>
    </>
  );
};
