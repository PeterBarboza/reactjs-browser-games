import { ONE_SECOND_IN_MS } from "../constants"
import { GameState } from "../gameState"
import { INPUTS_LOGIC_ENUM } from "./inputsLogic"

interface ProcessingEngine2DConstructor {
  processingLoopConfig: {
    ticksPerSecond: number
  }
  gameState: GameState
}

export class ProcessingEngine2D {
  processingLoop: NodeJS.Timeout
  gameState: GameState

  constructor({ processingLoopConfig, gameState }: ProcessingEngine2DConstructor) {
    const tickInterval = ONE_SECOND_IN_MS / processingLoopConfig.ticksPerSecond

    this.gameState = gameState

    this.processingLoop = setInterval(() => {
      this.processInputs()
    }, tickInterval)
  }

  processInputs() {
    for (let i = 0; i < this.gameState.entities.length; i++) {
      const entity = this.gameState.entities[i]

      if (!entity.inputs) continue

      for (const [key, input] of entity.inputs) {
        if (!this.gameState.isInputActive(input)) continue

        const inputLogic = INPUTS_LOGIC_ENUM[key]

        inputLogic({
          entity,
          gameState: this.gameState,
        })
      }
    }
  }
}