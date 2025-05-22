import React from "react";
import { Modal, Drawer, useTheme, useMediaQuery } from "@mui/material";

export interface BaseModalProps {
  open: boolean;
  children: JSX.Element;
  onClose: () => void;
}

const BaseModal: React.FC<BaseModalProps> = ({ open, children, onClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return isMobile ? (
    <Drawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { borderTopLeftRadius: 16, borderTopRightRadius: 16 } }}
    >
      {children}
    </Drawer>
  ) : (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </Modal>
  );
};

export default BaseModal;
