import { GameState } from "../gameState"
import { EntityState } from "../interface"

interface InputProcessingLogicParams {
  entitie: EntityState
  gameState: GameState
}

export const INPUTS_LOGIC_ENUM: { [key: string]: (params: InputProcessingLogicParams) => void } = {
  left: ({ entitie }: InputProcessingLogicParams) => {
    if (
      entitie.position.x < 0 ||
      entitie.position.x - entitie.parameters.baseSpeed < 0
    ) {
      entitie.position.x = 0
      return
    }

    entitie.position.x = entitie.position.x - entitie.parameters.baseSpeed
  },
  up: ({ entitie }: InputProcessingLogicParams) => {
    if (
      entitie.position.y < 0 ||
      entitie.position.y - entitie.parameters.baseSpeed < 0
    ) {
      entitie.position.y = 0
      return
    }

    entitie.position.y = entitie.position.y - entitie.parameters.baseSpeed
  },
  right: ({ entitie, gameState }: InputProcessingLogicParams) => {
    if (
      entitie.position.x > gameState.canvas.width ||
      entitie.position.x + entitie.parameters.width > gameState.canvas.width ||
      entitie.position.x + entitie.parameters.baseSpeed + entitie.parameters.width >= gameState.canvas.width
    ) {
      entitie.position.x = gameState.canvas.width - entitie.parameters.width
      return
    }

    entitie.position.x = entitie.position.x + entitie.parameters.baseSpeed
  },
  down: ({ entitie, gameState }: InputProcessingLogicParams) => {
    if (
      entitie.position.y > gameState.canvas.height ||
      entitie.position.y + entitie.parameters.height > gameState.canvas.height ||
      entitie.position.y + entitie.parameters.baseSpeed + entitie.parameters.height >= gameState.canvas.height
    ) {
      entitie.position.y = gameState.canvas.height - entitie.parameters.height
      return
    }

    entitie.position.y = entitie.position.y + entitie.parameters.baseSpeed
  },
}