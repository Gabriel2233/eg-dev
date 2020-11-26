import React, { useCallback, useMemo, useState } from "react";
import { chakra, Code } from "@chakra-ui/react";

import { createEditor, Node, Text } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { RichToolbar } from "./RichToolbar";
import { RichComponents } from "../utils/slateUtils";

import { FiBold, FiCode, FiItalic, FiUnderline } from "react-icons/fi";
import { AiOutlineOrderedList, AiOutlineUnorderedList } from "react-icons/ai";
import { GrBlockQuote } from "react-icons/gr";
import { BiHeading } from "react-icons/bi";

export const DescriptionRichEditor = () => {
  const [value, setValue] = useState<Node[]>([
    {
      type: "paragraph",
      children: [{ text: "This is editable " }],
    },
  ]);
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
      <Slate
        editor={editor}
        value={value}
        onChange={(newValue) => setValue(newValue as any)}
      >
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
          maxH="300px"
          overflowY="auto"
          w="full"
          borderWidth={1}
          borderColor="gray.200"
          roundedBottom="4px"
          _focus={{ borderColor: "yellow.400" }}
          p={4}
        >
          <Editable renderElement={renderElement} renderLeaf={renderLeaf} />
        </chakra.div>
      </Slate>
    </>
  );
};
