import { IconButton, Portal } from "shared/ui";
import style from "./MobileNavigation.module.scss";
import { Navigation } from "widgets/sidebar/ui/Navigation.tsx";
import closeIcon from "shared/assets/icons/close.svg";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const MobileNavigation = (props: Props) => {
  const { open, onClose } = props;

  return open ? (
    <Portal id={"test-aboba"}>
      <div
        className={style.mobile_navigation}
      >
        <div className={style.header}>
          <IconButton icon={closeIcon} alt={"close"} onClick={onClose}/>
        </div>
        <Navigation onSelect={onClose}/>
      </div>
    </Portal>
  ) : null;
};
