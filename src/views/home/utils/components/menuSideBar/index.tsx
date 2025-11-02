// ** React Import
import { useDispatch } from "react-redux";
import { Fragment, useState } from "react";

// ** Styles Import
import styles from "./index.module.scss";

// ** Another Import
import { Dialog } from "@mui/material";
import ListArtists from "./components/ListArtists";
import { handleShowMenubar } from "../../../store/headerStore";
import { useAppSelector } from "../../../../../hooks/useReduxHook";
import { Transition } from "../../../../../utils/components/Transition";
import { listItemMenu } from "../../../../../data/home/listMenuSideBar";

function MenuSidebar() {
  // ** State
  const [showList, setShowList] = useState<boolean>(false);

  // ** Hook
  const dispatch = useDispatch();
  const showMenubar = useAppSelector((store) => store.home.header);

  // ** Function
  const closeSideBar = () => {
    dispatch(handleShowMenubar(false));
  };

  const handleShowList = () => {
    setShowList(!showList);
  };

  return (
    <Dialog
      onClose={closeSideBar}
      open={showMenubar.showMenubar}
      TransitionComponent={Transition}
      className={styles.menuSideBar}
      PaperProps={{
        style: {
          margin: 0,
          width: "100%",
          maxHeight: "70%",
          height: "auto",
          overflow: "hidden",
          backgroundColor: '#FAF4EB',
        },
      }}
    >
      <button className={styles.menuSideBar__close} onClick={closeSideBar}>
        <span className="material-symbols-outlined">close</span>
      </button>
      <div className={styles.menuSideBar__list}>
        {listItemMenu.map((item) => (
          <button className={styles.item}>
            {item.menuExtra ? (
              <Fragment>
                <p onClick={handleShowList}>
                  {item.name}
                  {showList ? item.icon : item.iconActive}
                </p>
                <ListArtists showList={showList} />
              </Fragment>
            ) : (
              item.name
            )}
          </button>
        ))}
      </div>
    </Dialog>
  );
}

export default MenuSidebar;
