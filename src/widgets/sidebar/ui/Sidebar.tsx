import style from "./Sidebar.module.scss";
import logo from "shared/assets/images/logo.svg";
import { IconButton } from "shared/ui";
import dashboardIcon from "shared/assets/icons/dashboard.svg";
import { useState } from "react";
import { Navigation } from "widgets/sidebar/ui/Navigation.tsx";
import { MobileNavigation } from "widgets/sidebar/ui/MobileNavigation.tsx";

export const Sidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <aside className={style.sidebar}>
      <div className={style.logo_container}>
        <img className={style.logo} src={logo} alt={"Logo"} />
      </div>
      <div className={style.navigation_wrapper}>
        <Navigation />
      </div>
      <IconButton
        className={style.mobile_menu_button}
        icon={dashboardIcon}
        onClick={() => setOpen(true)}
      />
      <MobileNavigation open={open} onClose={() => setOpen(false)} />
    </aside>
  );
};
