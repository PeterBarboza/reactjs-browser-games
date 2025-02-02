import { GameState } from "../gameState"
import { EntityState } from "../interface"

interface InputProcessingLogicParams {
  entity: EntityState
  gameState: GameState
}

export const INPUTS_LOGIC_ENUM: { [key: string]: (params: InputProcessingLogicParams) => void } = {
  left: ({ entity }: InputProcessingLogicParams) => {
    if (
      entity.position.x < 0 ||
      entity.position.x - entity.parameters.baseSpeed < 0
    ) {
      entity.position.x = 0
      return
    }

    entity.position.x = entity.position.x - entity.parameters.baseSpeed
  },
  up: ({ entity }: InputProcessingLogicParams) => {
    if (
      entity.position.y < 0 ||
      entity.position.y - entity.parameters.baseSpeed < 0
    ) {
      entity.position.y = 0
      return
    }

    entity.position.y = entity.position.y - entity.parameters.baseSpeed
  },
  right: ({ entity, gameState }: InputProcessingLogicParams) => {
    if (
      entity.position.x > gameState.canvas.width ||
      entity.position.x + entity.parameters.width > gameState.canvas.width ||
      entity.position.x + entity.parameters.baseSpeed + entity.parameters.width >= gameState.canvas.width
    ) {
      entity.position.x = gameState.canvas.width - entity.parameters.width
      return
    }

    entity.position.x = entity.position.x + entity.parameters.baseSpeed
  },
  down: ({ entity, gameState }: InputProcessingLogicParams) => {
    if (
      entity.position.y > gameState.canvas.height ||
      entity.position.y + entity.parameters.height > gameState.canvas.height ||
      entity.position.y + entity.parameters.baseSpeed + entity.parameters.height >= gameState.canvas.height
    ) {
      entity.position.y = gameState.canvas.height - entity.parameters.height
      return
    }

    entity.position.y = entity.position.y + entity.parameters.baseSpeed
  },
}