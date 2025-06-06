import { Dialog, styled } from "@mui/material";
import style from "./Modal.module.scss";
import React, { ReactNode } from "react";
import closeIcon from "shared/assets/icons/close.svg";
import { IconButton } from "shared/ui";

const CustomDialog = styled(Dialog)(() => ({
  "& .MuiDialogContent-root": {
    padding: 0,
  },
  "& .MuiDialog-paper": {
    backgroundColor: "rgba(50, 50, 50)",
    borderRadius: "30px",
    color: "rgba(255, 255, 255, 0.87)",
    padding: "2em",
    width: "1000px",
    overflowY: "unset",
  },
}));

interface Props {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export const Modal = (props: Props) => {
  const { open, onClose, title, children, onClick } = props;

  return (
    <>
      <CustomDialog open={open} onClose={onClose} onClick={onClick}>
        <div className={style.modal_header}>
          {title && <h2 className={style.title}>{title}</h2>}
          <IconButton icon={closeIcon} alt={"close"} onClick={onClose} />
        </div>
        {children}
      </CustomDialog>
    </>
  );
};
