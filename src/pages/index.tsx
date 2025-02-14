import { useEffect, useRef } from "react";

import { GameState } from "@/lib/engine2D/gameState";
import { GraphicEngine2D } from "@/lib/engine2D/graphicEngine";
import { CanvasRenderer } from "@/lib/engine2D/graphicEngine/canvasRenderer";
import { Renderer } from "@/lib/engine2D/graphicEngine/interface";
import { ProcessingEngine2D } from "@/lib/engine2D/processingEngine";
import { TOP_DOWN_CONTROLS_HANDLERS } from "@/lib/engine2D/preset/topdown/inputsLogic";

// Configuration
const PLAYER_WIDTH = 50
const PLAYER_HEIGHT = 50
const PLAYER_SPEED = 5
const PLAYER_MAX_SPEED = PLAYER_SPEED * 5
const PLAYER_ACCELERATION = 1

const CANVAS_WIDTH = 500
const CANVAS_HEIGHT = 500

// Processing
const TICKS_PER_SECOND = 30

// Rendering
const FRAMES_PER_SECOND = 60

// NOTE: Not working yet
export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gameStateRef = useRef<GameState>(null)
  const rendererRef = useRef<Renderer>(null)
  const engineRef = useRef<ProcessingEngine2D>(null)
  const graphicEngineRef = useRef<GraphicEngine2D>(null)

  // TODO: Abstrair o setup abaixo
  useEffect(() => {
    if (!canvasRef.current) return

    const isAlreadyInitialized = 
      gameStateRef.current ||
      engineRef.current ||
      graphicEngineRef.current

    if (isAlreadyInitialized) return

    const gameState = new GameState({
      canvas: {
        width: CANVAS_WIDTH,
        height: CANVAS_HEIGHT,
      },
      controlsHandlers: TOP_DOWN_CONTROLS_HANDLERS
    })
    gameState.entities = [
      {
        id: "1",
        controls: {
          simple: [
            {
              key: "left",
              input: "ArrowLeft",
            },
            {
              key: "up",
              input: "ArrowUp",
            },
            {
              key: "right",
              input: "ArrowRight",
            },
            {
              key: "down",
              input: "ArrowDown",
            },
          ],
          combination: [
            {
              key: "leftUp",
              parts: new Set(["ArrowLeft", "ArrowUp"])
            },
            {
              key: "leftDown",
              parts: new Set(["ArrowLeft", "ArrowDown"])
            },
            {
              key: "rightUp",
              parts: new Set(["ArrowRight", "ArrowUp"])
            },
            {
              key: "rightDown",
              parts: new Set(["ArrowRight", "ArrowDown"])
            },
          ],
        },
        parameters: {
          baseSpeed: PLAYER_SPEED,
          width: PLAYER_WIDTH,
          height: PLAYER_HEIGHT,
          maxSpeed: PLAYER_MAX_SPEED,
          timeAccelerating: 0,
          acceleration: PLAYER_ACCELERATION,
        },
        position: {
          x: 0,
          y: 0,
        },
        previousPosition: null
      },
      {
        id: "2",
        controls: {
          simple: [
            {
              key: "left",
              input: "a",
            },
            {
              key: "up",
              input: "w",
            },
            {
              key: "right",
              input: "d",
            },
            {
              key: "down",
              input: "s",
            },
          ],
          combination: [
            {
              key: "leftUp",
              parts: new Set(["a", "w"])
            },
            {
              key: "leftDown",
              parts: new Set(["a", "s"])
            },
            {
              key: "rightUp",
              parts: new Set(["d", "w"])
            },
            {
              key: "rightDown",
              parts: new Set(["d", "s"])
            },
          ],
        },
        parameters: {
          width: PLAYER_WIDTH,
          height: PLAYER_HEIGHT,
          baseSpeed: PLAYER_SPEED,
          maxSpeed: PLAYER_MAX_SPEED,
          timeAccelerating: 0,
          acceleration: PLAYER_ACCELERATION,
        },
        position: {
          x: 50,
          y: 50,
        },
        previousPosition: null
      },
    ]
    gameStateRef.current = gameState

    const canvasRenderer = new CanvasRenderer({
      canvas: canvasRef.current,
      gameState: gameStateRef.current,
    })
    rendererRef.current = canvasRenderer

    const processingEngine2D = new ProcessingEngine2D({
      gameState: gameStateRef.current,
      processingLoopConfig: {
        ticksPerSecond: TICKS_PER_SECOND
      }
    })
    engineRef.current = processingEngine2D

    const graphicEngine = new GraphicEngine2D({
      gameState: gameStateRef.current,
      renderer: canvasRenderer,
      renderingLoopConfig: {
        framesPerSecond: FRAMES_PER_SECOND
      },
    })
    graphicEngineRef.current = graphicEngine

    const onKeyDown = (event: KeyboardEvent) => {
      gameStateRef.current!.activateInput(event.key)
    }
    const onKeyUp = (event: KeyboardEvent) => {
      gameStateRef.current!.deactivateInput(event.key)
    }
    const onBlur = () => {
      gameStateRef.current!.deactivateAllInputs()
    }

    document.addEventListener("keydown", onKeyDown)
    document.addEventListener("keyup", onKeyUp)
    window.addEventListener("blur", onBlur)

    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.removeEventListener("keyup", onKeyUp)
      document.removeEventListener("blur", onBlur)
    }
  }, [])

  return (
    <div className="min-h-screen flex justify-center items-center bg-zinc-400">
      <canvas
        ref={canvasRef}
        className="border border-black"
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
      >
      </canvas>
    </div>
  );
}
