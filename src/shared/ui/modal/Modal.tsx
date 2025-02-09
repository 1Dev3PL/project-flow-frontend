import { Dialog, styled } from "@mui/material";
import style from "./Modal.module.scss";
import { ReactNode } from "react";
import closeIcon from "shared/assets/icons/close.svg";

const CustomDialog = styled(Dialog)(() => ({
  "& .MuiDialogContent-root": {
    padding: 0,
  },
  "& .MuiDialog-paper": {
    backgroundColor: "rgba(255, 255, 255, 0.10)",
    backdropFilter: "blur(8px)",
    borderRadius: "30px",
    color: "rgba(255, 255, 255, 0.87)",
    padding: "2em",
    width: "1000px"
  },
}));

interface Props {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export const Modal = (props: Props) => {
  const {open, onClose, title, children} = props
  return (
    <>
      <CustomDialog open={open} onClose={onClose}>
        <div className={style.modal_header}>
          {title && <h2 className={style.title}>{title}</h2>}
          <button className={style.close_button} onClick={onClose}>
            <img src={closeIcon} alt={""} className={style.close_icon} />
          </button>
        </div>
        {children}
      </CustomDialog>
    </>
  );
};
