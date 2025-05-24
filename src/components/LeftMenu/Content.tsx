import { AddToPhotos, Folder, LibraryBooks } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Tooltip,
  Typography,
} from "@mui/material";

export interface LeftMenuContentProps {
  isMobile: boolean;
  onNewProject: () => void;
}
export default function LeftMenuContent({
  isMobile,
  onNewProject,
}: LeftMenuContentProps) {
  const projects: Array<{ id: string; name: string }> = [
    {
      id: "123",
      name: "The waky adventures of Mr bean",
    },
    {
      id: "123",
      name: "The waky adventures of Mr bean",
    },
    {
      id: "123",
      name: "The waky adventures of Mr bean",
    },
    {
      id: "123",
      name: "The waky adventures of Mr bean",
    },
    {
      id: "123",
      name: "The waky adventures of Mr bean",
    },
    {
      id: "123",
      name: "The waky adventures of Mr bean",
    },
    {
      id: "123",
      name: "The waky adventures of Mr bean",
    },
    {
      id: "123",
      name: "The waky adventures of Mr bean",
    },
    {
      id: "123",
      name: "The waky adventures of Mr bean",
    },
    {
      id: "123",
      name: "The waky adventures of Mr bean",
    },
    {
      id: "123",
      name: "The waky adventures of Mr bean",
    },
    {
      id: "123",
      name: "The waky adventures of Mr bean",
    },
    {
      id: "123",
      name: "The waky adventures of Mr bean",
    },
    {
      id: "123",
      name: "The waky adventures of Mr bean",
    },
    {
      id: "123",
      name: "The waky adventures of Mr bean",
    },
    {
      id: "123",
      name: "The waky adventures of Mr bean",
    },
    {
      id: "123",
      name: "The waky adventures of Mr bean",
    },
  ];

  const onSelectProject = (projectId: string) => {};

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* New Project Button */}
      <Box sx={{ p: 2, display: "flex", alignItems: "center" }}>
        <Button
          onClick={() => onNewProject()}
          color="primary"
          aria-label="New project"
        >
          <AddToPhotos />
          <Typography variant="caption" sx={{ ml: 1, fontWeight: 100 }}>
            New Project
          </Typography>
        </Button>
      </Box>

      <Divider />

      {/* My Projects Section */}
      <List
        dense={isMobile}
        component="nav"
        aria-labelledby="my-projects-subheader"
        subheader={
          <ListSubheader component="div" id="my-projects-subheader">
            My Projects
          </ListSubheader>
        }
        sx={{
          flex: 1,
          overflowY: "auto",
          p: 0,
          caretColor: "#333",
          "&::-webkit-scrollbar": {
            width: "10px",
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
        {projects.length === 0 ? (
          <Box sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              No projects yet
            </Typography>
          </Box>
        ) : (
          projects.map((project) => (
            <Tooltip title={project.name}>
              <ListItemButton
                key={project.id}
                onClick={() => onSelectProject(project.id)}
              >
                <ListItemIcon>
                  <LibraryBooks />
                </ListItemIcon>
                <ListItemText
                  primary={project.name}
                  primaryTypographyProps={{
                    noWrap: true,
                    sx: {
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                    },
                  }}
                />
              </ListItemButton>
            </Tooltip>
          ))
        )}
      </List>
    </Box>
  );
}
