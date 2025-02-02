import { useEffect, useRef } from "react";

import { GameState } from "@/lib/engine2D/gameState";
import { GraphicEngine2D } from "@/lib/engine2D/graphicEngine";
import { CanvasRenderer } from "@/lib/engine2D/graphicEngine/canvasRenderer";
import { Renderer } from "@/lib/engine2D/graphicEngine/interface";
import { ProcessingEngine2D } from "@/lib/engine2D/processingEngine";

// Configuration
const PLAYER_WIDTH = 50
const PLAYER_HEIGHT = 50
const PLAYER_SPEED = 5

const CANVAS_WIDTH = 500
const CANVAS_HEIGHT = 500

// Processing
const TICKS_PER_SECOND = 24

// Rendering
const FRAMES_PER_SECOND = 30

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
      }
    })
    gameState.entities = [
      {
        id: "1",
        inputs: [
          ["left", "ArrowLeft"],
          ["up", "ArrowUp"],
          ["right", "ArrowRight"],
          ["down", "ArrowDown"],
        ],
        parameters: {
          baseSpeed: PLAYER_SPEED,
          width: PLAYER_WIDTH,
          height: PLAYER_HEIGHT,
        },
        position: {
          x: 0,
          y: 0,
        },
        previousPosition: null
      },
      {
        id: "2",
        inputs: [
          ["left", "a"],
          ["up", "w"],
          ["right", "d"],
          ["down", "s"],
        ],
        parameters: {
          width: PLAYER_WIDTH,
          height: PLAYER_HEIGHT,
          baseSpeed: PLAYER_SPEED,
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
