import { IconButton, Portal } from "shared/ui";
import style from "./MobileNavigation.module.scss";
import closeIcon from "shared/assets/icons/close.svg";
import { NavLinks } from "widgets/sidebar/ui/NavLinks.tsx";
import { CurrentProjectInfo } from "widgets/sidebar/ui/CurrentProjectInfo.tsx";
import { UserInfo } from "widgets/sidebar/ui/UserInfo.tsx";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const MobileNavigation = (props: Props) => {
  const { open, onClose } = props;

  return open ? (
    <Portal id={"mobile-navigation"}>
      <div
        className={style.container}
      >
        <div className={style.header}>
          <IconButton icon={closeIcon} alt={"close"} onClick={onClose}/>
        </div>
        <nav className={style.navigation}>
          <NavLinks onSelect={onClose} />
          <CurrentProjectInfo onClick={onClose} />
          <UserInfo onClick={onClose} />
        </nav>
      </div>
    </Portal>
  ) : null;
};
