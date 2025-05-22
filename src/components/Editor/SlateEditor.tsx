import React, {
  useMemo,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import {
  createEditor,
  Transforms,
  Element as SlateElement,
  Descendant,
} from "slate";
import {
  Slate,
  Editable,
  withReact,
  ReactEditor,
  useSelected,
  useFocused,
  useSlateStatic,
} from "slate-react";
import { withHistory } from "slate-history";
import {
  Box,
  Button,
  Modal,
  TextField,
  MenuItem,
  Typography,
  IconButton,
  Paper,
  Divider,
  Stack,
} from "@mui/material";
import { Close, Save } from "@mui/icons-material";
import { CharacterElement } from "../../types/entities";
import ToolbarEditor from "./ToolbarEditor";

type CustomElement =
  | CharacterElement
  | { type: "paragraph"; children: Descendant[] };

declare module "slate" {
  interface CustomTypes {
    Element: CustomElement;
  }
}

export default function SlateEditor() {
  const editor = useMemo(() => {
    const e = withHistory(withReact(createEditor())) as ReactEditor;
    // Make 'character' elements inline so they don't break lines
    const { isInline } = e;
    e.isInline = (element) =>
      element.type === "character" ? true : isInline(element);
    return e;
  }, []);

  const [value, setValue] = useState<Descendant[]>([
    { type: "paragraph", children: [{ text: "" }] },
  ]);
  const [title, setTitle] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState<number[] | null>(null);
  const [mood, setMood] = useState<string>("");
  const [bgColor, setBgColor] = useState<string>("#ffffff");
  // Ref for scroll container
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to cursor on content or selection change
  useEffect(() => {
    window.requestAnimationFrame(() => {
      const sel = window.getSelection();
      if (!sel || !sel.focusNode) return;

      // Find the DOM node that actually wraps the cursor text
      const focusNode = sel.focusNode;
      // Sometimes the focusNode is a text node, so take its parentElement
      const el = (
        focusNode.nodeType === Node.TEXT_NODE
          ? focusNode.parentElement
          : focusNode
      ) as HTMLElement | null;
      const container = containerRef.current;
      if (!el || !container) return;

      // Compute the position of the cursor element **within** the container
      const elTop = el.offsetTop;
      const elHeight = el.offsetHeight;
      const containerHeight = container.clientHeight;

      // Scroll so that the cursor sits roughly in the middle
      const scrollTo = elTop - containerHeight / 2 + elHeight / 2;
      container.scrollTo({ top: scrollTo, behavior: "smooth" });
    });
  }, [value, editor.selection]);

  // Render either paragraph or character
  const renderElement = useCallback((props: any) => {
    const { element } = props;
    if (element.type === "character") {
      return <CharacterElement {...props} />;
    }
    return (
      <p
        {...props.attributes}
        style={{
          lineHeight: "2.1em",
          fontFamily: "'Courier Prime', monospace",
          fontSize: "1rem",
        }}
      >
        {props.children}
      </p>
    );
  }, []);

  // Character element component
  const CharacterElement: React.FC<any> = ({
    attributes,
    children,
    element,
  }) => {
    const handleClick = () => {
      // Compute the path right now
      const path = ReactEditor.findPath(editor, element as SlateElement);
      setCurrentPath(path);
      setMood(element.mood || "");
      setBgColor(element.bgColor || "#ffffff");
      setModalOpen(true);
    };
    const selected = useSelected();
    const focused = useFocused();

    return (
      <span
        {...attributes}
        onClick={handleClick}
        contentEditable={false}
        style={{
          display: "inline-block",
          position: "relative",
          padding: "0 4px",
          margin: "0 2px",
          backgroundColor: element.bgColor || "rgba(200,200,200,0.2)",
          border: selected && focused ? "1px solid #1976d2" : "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        {/* Badge on top */}
        <Typography
          variant="caption"
          sx={{
            position: "absolute",
            top: -18,
            left: 0,
            backgroundColor: "#1976d2",
            color: "white",
            px: 0.5,
            borderRadius: "3px",
            whiteSpace: "nowrap",
            fontSize: "0.75rem",
          }}
        >
          {element.name}
        </Typography>
        {children}
      </span>
    );
  };

  // Apply mood and background
  const applyAttrs = () => {
    if (currentPath) {
      Transforms.setNodes(editor, { mood, bgColor } as any, {
        at: currentPath,
      });
    }
    setModalOpen(false);
  };

  // Unassign character
  const unassign = () => {
    if (currentPath) {
      Transforms.unwrapNodes(editor, {
        at: currentPath,
        match: (n) =>
          SlateElement.isElement(n) && (n as any).type === "character",
      });
    }
    setModalOpen(false);
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1000);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Toolbar */}
      <ToolbarEditor editor={editor} />

      <Box
        ref={containerRef}
        sx={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          overscrollBehavior: "contain",
          scrollBehavior: "smooth",
          px: 2,
          py: 1,
          caretColor: "#333",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.4)",
            },
          },
          scrollbarWidth: "thin",
          scrollbarColor: "rgba(0,0,0,0.2) transparent",
        }}
      >
        {/* Editor */}
        <Slate
          editor={editor}
          initialValue={value}
          onChange={(newVal) => setValue(newVal)}
        >
          <Editable
            renderElement={renderElement}
            placeholder="Write your story..."
            style={{
              // minHeight: 200,
              cursor: "text",
              outline: "none",
              // caretColor: "#333",
            }}
            // Increase padding to fit badges
            renderLeaf={(props) => (
              <span {...props.attributes}>{props.children}</span>
            )}
          />
        </Slate>
      </Box>

      {/* Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Paper sx={{ p: 2, width: 300, m: "20% auto" }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">Edit Dialog</Typography>
            <IconButton onClick={() => setModalOpen(false)}>
              <Close />
            </IconButton>
          </Box>

          <TextField
            fullWidth
            select
            label="Mood"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            sx={{ mt: 2 }}
          >
            {["happy", "sad", "angry", "neutral"].map((m) => (
              <MenuItem key={m} value={m}>
                {m}
              </MenuItem>
            ))}
          </TextField>

          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" gutterBottom>
              Background Color
            </Typography>
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              style={{ width: "100%", height: 36, border: "none" }}
            />
          </Box>

          <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
            <Button variant="contained" onClick={applyAttrs} sx={{ flex: 1 }}>
              Apply
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={unassign}
              sx={{ flex: 1 }}
            >
              Unassign
            </Button>
          </Box>
        </Paper>
      </Modal>
    </Box>
  );
}
