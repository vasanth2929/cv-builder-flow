import { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import "@uiw/react-md-editor/markdown-editor.css";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function MarkdownEditor({ value, onChange, placeholder }: MarkdownEditorProps) {
  const [internalValue, setInternalValue] = useState(value);

  const handleChange = (val?: string) => {
    const newValue = val || "";
    setInternalValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="markdown-editor">
      <MDEditor
        value={internalValue}
        onChange={handleChange}
        preview="edit"
        hideToolbar={false}
        height={300}
        data-color-mode="light"
        visibleDragbar={false}
      />
    </div>
  );
}