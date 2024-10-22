import React, { useState, useEffect, useRef } from "react";
import styles from "./snake.module.css";

const SnakeGame = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [direction, setDirection] = useState({ x: 0, y: 0 });
  const [speed, setSpeed] = useState(200);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          setDirection({ x: 0, y: -1 });
          break;
        case "ArrowDown":
          setDirection({ x: 0, y: 1 });
          break;
        case "ArrowLeft":
          setDirection({ x: -1, y: 0 });
          break;
        case "ArrowRight":
          setDirection({ x: 1, y: 0 });
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

      setSnake((prevSnake) => {
        const newSnake = [...prevSnake];
        const head = { x: newSnake[0].x + direction.x, y: newSnake[0].y + direction.y };

        if (head.x === food.x && head.y === food.y) {
          setFood({ x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) });
        } else {
          newSnake.pop();
        }

        if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20 || newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
          setIsGameOver(true);
          return prevSnake;
        }

        newSnake.unshift(head);
        return newSnake;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [direction, food, isGameOver, speed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = "green";
      snake.forEach(segment => {
        context.fillRect(segment.x * 20, segment.y * 20, 20, 20);
      });

      context.fillStyle = "red";
      context.fillRect(food.x * 20, food.y * 20, 20, 20);
    }
  }, [snake, food]);

  return (
    <div className={styles.gameContainer}>
      <canvas ref={canvasRef} width={400} height={400} className={styles.canvas} />
      {isGameOver && <div className={styles.gameOver}>Game Over</div>}
    </div>
  );
};

export default SnakeGame;
