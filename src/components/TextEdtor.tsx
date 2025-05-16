import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { updateContent, setSelection } from "../store/slices/editorSlice";
import { styled } from "@mui/system";

const RetroEditorContainer = styled("div")({
  display: "flex",
  flex: 1,
  flexDirection: "column",
  overflow: "hidden",
  position: "relative",
  padding: "2rem",
  background: "#f8f5e6",
  boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
  borderRadius: "4px",
  border: "1px solid #e8e5d5",
});

const TypewriterTextarea = styled("textarea")({
  width: "100%",
  minHeight: "500px",
  border: "none",
  outline: "none",
  resize: "none",
  background: "transparent",
  fontFamily: '"Courier Prime", monospace',
  fontSize: "1.1rem",
  lineHeight: "1.6",
  color: "#333",
  padding: "1rem",
  caretColor: "#333",
  "&::selection": {
    background: "rgba(255, 235, 150, 0.5)",
  },
});

const TextEditor: React.FC = () => {
  const dispatch = useDispatch();
  const content = useSelector((state: RootState) => state.editor.content);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isTyping, setIsTyping] = useState(false);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(updateContent(e.target.value));
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 100);
  };

  const handleSelectionChange = () => {
    if (textareaRef.current) {
      const start = textareaRef.current.selectionStart;
      const end = textareaRef.current.selectionEnd;
      if (start !== end) {
        dispatch(setSelection({ start, end }));
      } else {
        dispatch(setSelection(null));
      }
    }
  };

  return (
    <RetroEditorContainer>
      <TypewriterTextarea
        ref={textareaRef}
        value={content}
        onChange={handleTextChange}
        onSelect={handleSelectionChange}
        placeholder="Start typing your story..."
      />
    </RetroEditorContainer>
  );
};

export default TextEditor;
