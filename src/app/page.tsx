import { useRouter } from "next/router";
import styles from "./page.module.css";

export default function Home() {
  const router = useRouter();

  const games = [
    { name: "Snake", path: "/snake" },
    { name: "Pong", path: "/pong" },
  ];

  const handlePlay = (path: string) => {
    router.push(path);
  };

  return (
    <div className={styles.page}>
      <div className={styles.grid}>
        {games.map((game) => (
          <div key={game.name} className={styles.game}>
            <h2>{game.name}</h2>
            <button onClick={() => handlePlay(game.path)}>Play</button>
          </div>
        ))}
      </div>
    </div>
  );
}
