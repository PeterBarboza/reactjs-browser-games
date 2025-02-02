import { ONE_SECOND_IN_MS } from "../constants"
import { GameState } from "../gameState"
import { Renderer } from "./interface"

interface GraphicEngine2DConstructor {
  renderingLoopConfig: {
    framesPerSecond: number
  }
  gameState: GameState
  renderer: Renderer
}

export class GraphicEngine2D {
  renderingLoop: NodeJS.Timeout
  gameState: GameState
  renderer: Renderer

  constructor({ renderingLoopConfig, gameState, renderer }: GraphicEngine2DConstructor) {
    const renderingInterval = ONE_SECOND_IN_MS / renderingLoopConfig.framesPerSecond

    this.gameState = gameState
    this.renderer = renderer

    this.renderingLoop = setInterval(() => {
      this.render()
    }, renderingInterval)
  }

  render() {
    this.renderer.draw()
  }
}