import { useState, useRef } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Stack,
  Chip,
  IconButton,
  Paper,
  Modal,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  Divider,
  InputAdornment,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Save, Add, Close, Search, PersonAdd } from "@mui/icons-material";
import { useAppSelector } from "../store/hooks";
import TextEditor from "../components/TextEdtor";
import TextEditorToolbar from "../components/TextEditorToolBar";
import EditorPreview from "../components/EditorPreview";

export default function StoryEditorPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmotion, setSelectedEmotion] = useState("neutral");
  const [tabValue, setTabValue] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const characters = useAppSelector((state) => state.characters.list);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const emotions = ["neutral", "happy", "angry", "sad", "surprised"];
  const filteredCharacters = characters.filter((char) =>
    char.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInsertCharacter = (characterName: string) => {
    if (!textareaRef.current) return;

    const textarea = textareaRef.current;
    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    const emotionTag =
      selectedEmotion !== "neutral" ? `:${selectedEmotion}` : "";
    const newContent =
      content.substring(0, startPos) +
      `[${characterName}${emotionTag}]` +
      content.substring(endPos);

    setContent(newContent);
    setOpenModal(false);

    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart =
        startPos + characterName.length + emotionTag.length + 2;
      textarea.selectionEnd =
        startPos + characterName.length + emotionTag.length + 2;
    }, 0);
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1000);
  };

  const handleOpenNewCharacterModal = () => {
    // Implement your new character modal logic here
    console.log("Open new character modal");
  };

  const ModalComponent = isMobile ? Dialog : Modal;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 64px)",
        p: 3,
        overflow: "hidden",
        paddingTop: "5%",
      }}
    >
      {/* Header Section */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 1 }}>
          Story Editor
        </Typography>

        <Stack direction="row" spacing={2} alignItems="center">
          <TextField
            fullWidth
            variant="outlined"
            label="Story Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ flex: 1 }}
          />

          <Button
            variant="contained"
            startIcon={<Save />}
            onClick={handleSave}
            disabled={isSaving || !title || !content}
            size="large"
          >
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </Stack>
      </Box>

      {/* Editor Area */}
      <TextEditorToolbar
        onPreviewModeToggle={() => setIsPreviewMode(!isPreviewMode)}
        isPreviewMode={isPreviewMode}
      />

      {isPreviewMode ? (
        <EditorPreview />
      ) : (
        <>
          <TextEditor />
        </>
      )}

      {/* Character Selection Modal */}
      <ModalComponent
        open={openModal}
        onClose={() => setOpenModal(false)}
        fullScreen={isMobile}
        {...(isMobile
          ? {
              sx: {
                "& .MuiDialog-container": {
                  alignItems: "flex-end",
                },
                "& .MuiPaper-root": {
                  width: "100%",
                  margin: 0,
                  maxHeight: "90vh",
                  borderTopLeftRadius: "12px",
                  borderTopRightRadius: "12px",
                },
              },
            }
          : {
              sx: {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              },
            })}
      >
        <Paper
          sx={{
            width: isMobile ? "100%" : 400,
            maxHeight: isMobile ? "90vh" : "80vh",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <DialogTitle>
            <Typography variant="h6">Add Character</Typography>
          </DialogTitle>

          <DialogContent sx={{ flex: 1, overflow: "hidden", p: 0 }}>
            <Tabs
              value={tabValue}
              onChange={(e, newValue) => setTabValue(newValue)}
              variant="fullWidth"
            >
              <Tab label="Existing" />
              <Tab label="New" />
            </Tabs>

            <Box sx={{ p: 2 }}>
              {tabValue === 0 ? (
                <>
                  <TextField
                    fullWidth
                    placeholder="Search characters..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ mb: 2 }}
                  />

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Select Emotion:
                    </Typography>
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ flexWrap: "wrap" }}
                    >
                      {emotions.map((emotion) => (
                        <Chip
                          key={emotion}
                          label={emotion}
                          onClick={() => setSelectedEmotion(emotion)}
                          color={
                            selectedEmotion === emotion ? "primary" : "default"
                          }
                          variant={
                            selectedEmotion === emotion ? "filled" : "outlined"
                          }
                        />
                      ))}
                    </Stack>
                  </Box>

                  <List
                    sx={{
                      maxHeight: 300,
                      overflow: "auto",
                      border: "1px solid",
                      borderColor: "divider",
                      borderRadius: 1,
                    }}
                  >
                    {filteredCharacters.length > 0 ? (
                      filteredCharacters.map((char) => (
                        <ListItem
                          button
                          key={char.id}
                          onClick={() => handleInsertCharacter(char.name)}
                        >
                          <ListItemText primary={char.name} />
                        </ListItem>
                      ))
                    ) : (
                      <ListItem>
                        <ListItemText primary="No characters found" />
                      </ListItem>
                    )}
                  </List>
                </>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: 200,
                  }}
                >
                  <Button
                    variant="contained"
                    startIcon={<PersonAdd />}
                    onClick={handleOpenNewCharacterModal}
                  >
                    Create New Character
                  </Button>
                </Box>
              )}
            </Box>
          </DialogContent>

          <DialogActions>
            <Button onClick={() => setOpenModal(false)}>Cancel</Button>
            {tabValue === 0 && filteredCharacters.length > 0 && (
              <Button
                variant="contained"
                onClick={() =>
                  handleInsertCharacter(filteredCharacters[0].name)
                }
              >
                Add Selected
              </Button>
            )}
          </DialogActions>
        </Paper>
      </ModalComponent>
    </Box>
  );
}
