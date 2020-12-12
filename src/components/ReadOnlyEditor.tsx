import { useCallback, useMemo, useState } from "react";
import { createEditor, Node } from "slate";
import { Editable, Slate, withReact } from "slate-react";
import { RichComponents } from "../utils/slateUtils";

export const ReadOnlyEditor = ({ value }: { value: Node[] }) => {
  const renderElement = useCallback(
    (props) => <RichComponents.Element {...props} />,
    []
  );
  const renderLeaf = useCallback(
    (props) => <RichComponents.Leaf {...props} />,
    []
  );

  const editor = useMemo(() => withReact(createEditor()), []);

  const [editorValue, setEditorValue] = useState<Node[]>(value);

  return (
    <Slate editor={editor} onChange={setEditorValue} value={editorValue}>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        readOnly
      />
    </Slate>
  );
};
