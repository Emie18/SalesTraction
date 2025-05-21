import React, { useEffect, useRef } from "react";

const confettiColors = [
  "#fcf403", "#62fc03", "#f4fc03", "#03e7fc", "#03fca5", "#a503fc", "#fc03ad", "#fc03c2"
];
const DEG_TO_RAD = Math.PI / 180;

function getRandomInRange(min, max, precision = 0) {
  const multiplier = Math.pow(10, precision);
  const randomValue = Math.random() * (max - min) + min;
  return Math.floor(randomValue * multiplier) / multiplier;
}

function getScaleFactor() {
  return Math.log(window.innerWidth) / Math.log(1920);
}

class Confetti {
  constructor({ initialPosition, direction, radius, colors }) {
    const speedFactor = getRandomInRange(0.9, 1.7, 3) * getScaleFactor();
    this.speed = { x: speedFactor, y: speedFactor };
    this.finalSpeedX = getRandomInRange(0.2, 0.6, 3);
    this.rotationSpeed = getRandomInRange(0.03, 0.07, 3) * getScaleFactor();
    this.dragCoefficient = getRandomInRange(0.0005, 0.0009, 6);
    this.radius = { x: radius, y: radius };
    this.initialRadius = radius;
    this.rotationAngle = direction === "left" ? getRandomInRange(0, 0.2, 3) : getRandomInRange(-0.2, 0, 3);
    this.radiusYDirection = "down";

    const angle = direction === "left"
      ? getRandomInRange(82, 15) * DEG_TO_RAD
      : getRandomInRange(-15, -82) * DEG_TO_RAD;

    this.absCos = Math.abs(Math.cos(angle));
    this.absSin = Math.abs(Math.sin(angle));

    const offset = getRandomInRange(-150, 0);
    const position = {
      x: initialPosition.x + (direction === "left" ? -offset : offset) * this.absCos,
      y: initialPosition.y - offset * this.absSin,
    };

    this.position = { ...position };
    this.initialPosition = { ...position };
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.createdAt = Date.now();
    this.direction = direction;
  }

  draw(context) {
    const { x, y } = this.position;
    const { x: radiusX, y: radiusY } = this.radius;
    const scale = window.devicePixelRatio || 1;

    context.fillStyle = this.color;
    context.beginPath();
    context.ellipse(x * scale, y * scale, radiusX * scale, radiusY * scale, this.rotationAngle, 0, 2 * Math.PI);
    context.fill();
  }

  updatePosition(deltaTime, currentTime) {
    const elapsed = currentTime - this.createdAt;

    if (this.speed.x > this.finalSpeedX) {
      this.speed.x -= this.dragCoefficient * deltaTime;
    }

    this.position.x += this.speed.x * (this.direction === "left" ? -this.absCos : this.absCos) * deltaTime;
    this.position.y = this.initialPosition.y - this.speed.y * this.absSin * elapsed + 0.00125 * Math.pow(elapsed, 2) / 2;

    this.rotationSpeed -= 1e-5 * deltaTime;
    this.rotationSpeed = Math.max(this.rotationSpeed, 0);

    if (this.radiusYDirection === "down") {
      this.radius.y -= deltaTime * this.rotationSpeed;
      if (this.radius.y <= 0) {
        this.radius.y = 0;
        this.radiusYDirection = "up";
      }
    } else {
      this.radius.y += deltaTime * this.rotationSpeed;
      if (this.radius.y >= this.initialRadius) {
        this.radius.y = this.initialRadius;
        this.radiusYDirection = "down";
      }
    }
  }

  isVisible(canvasHeight) {
    return this.position.y < canvasHeight + 100;
  }
}

function ConfettiCanvas() {
  const canvasRef = useRef(null);
  const confettiRef = useRef([]);
  const lastUpdatedRef = useRef(Date.now());

  // Resize canvas
  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
  };

  // Initialize confetti
  const initConfetti = () => {
    const confettiArray = [];
    const baseY = (5 * window.innerHeight) / 7;
    const count = 250;
    const radius = 6;

    for (let i = 0; i < count / 2; i++) {
      confettiArray.push(
        new Confetti({
          initialPosition: { x: 0, y: baseY },
          direction: "right",
          radius,
          colors: confettiColors,
        }),
        new Confetti({
          initialPosition: { x: window.innerWidth, y: baseY },
          direction: "left",
          radius,
          colors: confettiColors,
        })
      );
    }
    confettiRef.current = confettiArray;
  };

  // Animation loop
  const loop = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    const currentTime = Date.now();
    const deltaTime = currentTime - lastUpdatedRef.current;
    lastUpdatedRef.current = currentTime;

    context.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw each confetti
    confettiRef.current = confettiRef.current.filter((confetti) => {
      confetti.updatePosition(deltaTime, currentTime);
      confetti.draw(context);
      return confetti.isVisible(canvas.height);
    });

    // If confetti array is empty, re-init to keep the effect continuous
    if (confettiRef.current.length === 0) {
      initConfetti();
    }

    requestAnimationFrame(loop);
  };

  useEffect(() => {
    resizeCanvas();
    initConfetti();
    lastUpdatedRef.current = Date.now();
    requestAnimationFrame(loop);

    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 500,
        width: "100%",
        height: "100%",
      }}
    />
  );
}

export default ConfettiCanvas;
