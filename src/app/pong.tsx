import React, { useState, useEffect, useRef } from "react";
import styles from "./pong.module.css";

const PongGame = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [ball, setBall] = useState({ x: 50, y: 50, dx: 2, dy: 2 });
  const [paddle1, setPaddle1] = useState({ y: 40 });
  const [paddle2, setPaddle2] = useState({ y: 40 });
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "w":
          setPaddle1((prev) => ({ y: Math.max(prev.y - 5, 0) }));
          break;
        case "s":
          setPaddle1((prev) => ({ y: Math.min(prev.y + 5, 90) }));
          break;
        case "ArrowUp":
          setPaddle2((prev) => ({ y: Math.max(prev.y - 5, 0) }));
          break;
        case "ArrowDown":
          setPaddle2((prev) => ({ y: Math.min(prev.y + 5, 90) }));
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isGameOver) return;

      setBall((prevBall) => {
        let { x, y, dx, dy } = prevBall;

        if (x + dx > 100 || x + dx < 0) {
          dx = -dx;
        }
        if (y + dy > 100 || y + dy < 0) {
          dy = -dy;
        }

        if (x + dx < 5 && y > paddle1.y && y < paddle1.y + 20) {
          dx = -dx;
        }
        if (x + dx > 95 && y > paddle2.y && y < paddle2.y + 20) {
          dx = -dx;
        }

        if (x + dx < 0) {
          setScore2((prev) => prev + 1);
          if (score2 + 1 === 10) {
            setIsGameOver(true);
          }
          return { x: 50, y: 50, dx: 2, dy: 2 };
        }
        if (x + dx > 100) {
          setScore1((prev) => prev + 1);
          if (score1 + 1 === 10) {
            setIsGameOver(true);
          }
          return { x: 50, y: 50, dx: 2, dy: 2 };
        }

        return { x: x + dx, y: y + dy, dx, dy };
      });
    }, 30);

    return () => clearInterval(interval);
  }, [paddle1, paddle2, isGameOver, score1, score2]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = "white";
      context.fillRect(ball.x, ball.y, 5, 5);

      context.fillStyle = "blue";
      context.fillRect(0, paddle1.y, 5, 20);

      context.fillStyle = "red";
      context.fillRect(95, paddle2.y, 5, 20);

      context.fillStyle = "white";
      context.fillText(`Player 1: ${score1}`, 10, 10);
      context.fillText(`Player 2: ${score2}`, 80, 10);
    }
  }, [ball, paddle1, paddle2, score1, score2]);

  return (
    <div className={styles.gameContainer}>
      <canvas ref={canvasRef} width={100} height={100} className={styles.canvas} />
      {isGameOver && <div className={styles.gameOver}>Game Over</div>}
    </div>
  );
};

export default PongGame;
