import { ONE_SECOND_IN_MS } from "../constants"
import { GameState, INPUT_STATE_ENUM, InputState } from "../gameState"

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

      if (!entity.controls) continue

      const parsedInputs = new Map<string, { state: InputState }>()
      const notIncludeInParsedResult: Record<string, true> = {}

      if (entity.controls.combination) {
        for (const { key, parts } of entity.controls.combination) {
          let combination: InputState = INPUT_STATE_ENUM.active

          for (const part of parts) {
            const inputState = this.gameState.getInputState(part)

            if (inputState === INPUT_STATE_ENUM.deactivated) {
              combination = INPUT_STATE_ENUM.deactivated
              break
            }
            if (inputState === INPUT_STATE_ENUM.toDeactivate) {
              combination = INPUT_STATE_ENUM.toDeactivate
              continue
            }
          }

          if (combination === INPUT_STATE_ENUM.active) {
            for (const part of parts) notIncludeInParsedResult[part] = true

            parsedInputs.set(key, { state: INPUT_STATE_ENUM.active })
          }
        }
      }

      if (entity.controls.simple) {
        for (const { key, input } of entity.controls.simple) {
          if (notIncludeInParsedResult[input]) continue

          const inputState = this.gameState.getInputState(input)

          if (inputState === INPUT_STATE_ENUM.toDeactivate) {
            this.gameState.clearInput(input)
          }

          parsedInputs.set(key, { state: inputState })
        }
      }

      for (const [key, { state }] of parsedInputs) {
        const inputState = state

        if (inputState === INPUT_STATE_ENUM.deactivated) continue

        const controlHandler = this.gameState.controlsHandlers[key]

        if (!controlHandler) continue

        controlHandler({
          entity,
          gameState: this.gameState,
          inputState,
        })
      }
    }
  }
}