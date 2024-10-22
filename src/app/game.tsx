import { useRouter } from "next/router";
import { ReactNode } from "react";
import styles from "./game.module.css";

const GameLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const handleBack = () => {
    router.push("/");
  };

  return (
    <div className={styles.gameLayout}>
      <button onClick={handleBack} className={styles.backButton}>
        Back
      </button>
      {children}
    </div>
  );
};

export default GameLayout;
