import { useCallback, useEffect, useRef } from "react";

// Constants
const ONDE_SECOND_IN_MS = 1000

// Configuration
const PLAYER_WIDTH = 50
const PLAYER_HEIGHT = 50
const PLAYER_SPEED = 5

const CANVAS_WIDTH = 500
const CANVAS_HEIGHT = 500

// Processing
const TICKS_PER_SECOND = 24
const TICK_INTERVAL = ONDE_SECOND_IN_MS / TICKS_PER_SECOND

// Rendering
const FRAMES_PER_SECOND = 30
const RENDERING_INTERVAL = ONDE_SECOND_IN_MS / FRAMES_PER_SECOND

interface PlayerInfo {
  x: number
  y: number
  color: string
  previousPosition: Pick<PlayerInfo, "x" | "y"> | null
  controls: {
    left: string
    up: string
    right: string
    down: string
  }
}
interface GameState {
  keysPressed: Set<string>
  players: PlayerInfo[]
}

export default function Home() {
  const canvas = useRef<HTMLCanvasElement>(null)
  const gameState = useRef<GameState>({
    keysPressed: new Set(),
    players: [
      {
        previousPosition: null,
        x: 0,
        y: 0,
        color: "red",
        controls: {
          left: "ArrowLeft",
          up: "ArrowUp",
          right: "ArrowRight",
          down: "ArrowDown",
        }
      },
      {
        previousPosition: null,
        x: 50,
        y: 50,
        color: "blue",
        controls: {
          left: "a",
          up: "w",
          right: "d",
          down: "s",
        }
      }
    ]
  })

  const processInputs = useCallback(() => {
    for (let i = 0; i < gameState.current.players.length; i++) {
      const player = gameState.current.players[i]

      if (gameState.current.keysPressed.has(player.controls.left)) {
        if (player.x > 0) {
          if (player.x - PLAYER_SPEED < 0) {
            player.x = 0
          } else {
            player.x = player.x - PLAYER_SPEED
          }
        }
      }
      if (gameState.current.keysPressed.has(player.controls.up)) {
        if (player.y > 0) {
          if (player.y - PLAYER_SPEED < 0) {
            player.y = 0
          } else {
            player.y = player.y - PLAYER_SPEED
          }
        }
      }
      if (gameState.current.keysPressed.has(player.controls.right)) {
        if (player.x < CANVAS_WIDTH) {
          if (player.x + PLAYER_SPEED + PLAYER_WIDTH >= CANVAS_WIDTH) {
            player.x = CANVAS_WIDTH - PLAYER_WIDTH
          } else {
            player.x = player.x + PLAYER_SPEED
          }
        }
      }
      if (gameState.current.keysPressed.has(player.controls.down)) {
        if (player.y < CANVAS_HEIGHT) {
          if (player.y + PLAYER_SPEED + PLAYER_HEIGHT >= CANVAS_HEIGHT) {
            player.y = CANVAS_HEIGHT - PLAYER_HEIGHT
          } else {
            player.y = player.y + PLAYER_SPEED
          }
        }
      }
    }
  }, [])

  const draw = useCallback(() => {
    if (!canvas.current) return null

    const context = canvas.current.getContext("2d")!

    for (let i = 0; i < gameState.current.players.length; i++) {
      const player = gameState.current.players[i]

      if (!player.previousPosition) continue

      context.clearRect(
        player.previousPosition.x,
        player.previousPosition.y,
        PLAYER_WIDTH,
        PLAYER_HEIGHT,
      )
    }

    for (let i = 0; i < gameState.current.players.length; i++) {
      const player = gameState.current.players[i]

      gameState.current.players[i].previousPosition = {
        x: player.x,
        y: player.y,
      }

      context.beginPath()

      context.fillStyle = player.color

      context.rect(
        player.x,
        player.y,
        PLAYER_WIDTH,
        PLAYER_HEIGHT,
      )

      context.fill()
    }
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      gameState.current.keysPressed.add(event.key)
    }
    const onKeyUp = (event: KeyboardEvent) => {
      gameState.current.keysPressed.delete(event.key)  
    }
    const onBlur = () => {
      gameState.current.keysPressed.clear()
    }

    document.addEventListener("keydown", onKeyDown)
    document.addEventListener("keyup", onKeyUp)
    window.addEventListener("blur", onBlur)

    const processLoop = setInterval(() => {
      processInputs()
    }, TICK_INTERVAL)

    const drawLoop = setInterval(() => {
      draw()
    }, RENDERING_INTERVAL)

    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.removeEventListener("keyup", onKeyUp)
      document.removeEventListener("blur", onBlur)

      clearInterval(processLoop)
      clearInterval(drawLoop)
    }
  }, [draw, processInputs])

  return (
    <div className="min-h-screen flex justify-center items-center bg-zinc-400">
      <canvas
        ref={canvas}
        className="border border-black"
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
      >
      </canvas>
    </div>
  );
}
