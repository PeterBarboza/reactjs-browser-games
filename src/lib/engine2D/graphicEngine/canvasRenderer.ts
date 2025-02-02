import { GameState } from "../gameState";
import { Renderer } from "./interface";

interface CanvasRendererConstructor {
  gameState: GameState
  canvas: HTMLCanvasElement
}

export class CanvasRenderer implements Renderer {
  canvas: HTMLCanvasElement
  gameState: GameState

  constructor({ gameState, canvas }: CanvasRendererConstructor) {
    this.gameState = gameState
    this.canvas = canvas
  }

  draw() {
    const context = this.canvas.getContext("2d")!

    for (let i = 0; i < this.gameState.entities.length; i++) {
      const entity = this.gameState.entities[i]

      if (!entity.previousPosition) continue

      context.clearRect(
        entity.previousPosition.x,
        entity.previousPosition.y,
        entity.parameters.width,
        entity.parameters.height,
      )
    }

    for (let i = 0; i < this.gameState.entities.length; i++) {
      const entity = this.gameState.entities[i]

      this.gameState.entities[i].previousPosition = {
        x: entity.position.x,
        y: entity.position.y,
      }

      context.beginPath()

      // context.fillStyle = entity.color
      context.fillStyle = "black"

      context.rect(
        entity.position.x,
        entity.position.y,
        entity.parameters.width,
        entity.parameters.height,
      )

      context.fill()
    }
  }
}