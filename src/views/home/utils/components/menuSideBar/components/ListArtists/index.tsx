// ** Styles Import
import styles from "./index.module.scss";

// ** Another Import
import { useNavigate } from "react-router-dom";
import { listArtists } from "../../../../../../../data/home/listArtist";

function ListArtists({ showList }: { showList: boolean }) {
  // ** Hook
  const navigate = useNavigate();

  // ** Function
  const handleNavigate = (artistUrl: string) => {
    navigate(artistUrl);
  };

  return (
    <div
      className={`${styles.listArtists} ${
        showList && styles["listArtists--show"]
      }`}
    >
      {listArtists.map((artist) => (
        <button
          key={artist.id}
          className={styles.artist}
          onClick={() => handleNavigate(artist.url)}
        >
          {artist.name}
        </button>
      ))}
    </div>
  );
}

export default ListArtists;
