import { GameState, InputState } from "../gameState"
import { EntityState } from "../interface"

interface InputProcessingLogicParams {
  entity: EntityState
  gameState: GameState
  inputState: InputState
}

export const INPUTS_LOGIC_ENUM: { [key: string]: (params: InputProcessingLogicParams) => void } = {
  left: ({ entity, inputState }: InputProcessingLogicParams) => {
    if (inputState === "toDeactivate") {
      if (entity.parameters.timeAccelerating !== null) {
        entity.parameters.timeAccelerating = 0
      }
      return
    }

    let currentSpeed = entity.parameters.baseSpeed

    // Lógica de aceleração | vf = vi + (a ⋅ t)
    if (entity.parameters.acceleration !== null && entity.parameters.timeAccelerating !== null) {
      currentSpeed =
        entity.parameters.baseSpeed + (entity.parameters.acceleration * entity.parameters.timeAccelerating)

      if (entity.parameters.maxSpeed && currentSpeed > entity.parameters.maxSpeed) {
        currentSpeed = entity.parameters.maxSpeed
      } else {
        entity.parameters.timeAccelerating = entity.parameters.timeAccelerating + 1
      }
    }

    // Lógica de colisão com paredes
    if (
      entity.position.x < 0 ||
      entity.position.x - currentSpeed < 0
    ) {
      if (entity.parameters.timeAccelerating !== null) {
        entity.parameters.timeAccelerating = 0
      }

      entity.position.x = 0
      return
    }

    entity.position.x = entity.position.x - currentSpeed
  },
  up: ({ entity, inputState }: InputProcessingLogicParams) => {
    if (inputState === "toDeactivate") {
      if (entity.parameters.timeAccelerating !== null) {
        entity.parameters.timeAccelerating = 0
      }
      return
    }

    let currentSpeed = entity.parameters.baseSpeed

    // Lógica de aceleração | vf = vi + (a ⋅ t)
    if (entity.parameters.acceleration !== null && entity.parameters.timeAccelerating !== null) {
      currentSpeed =
        entity.parameters.baseSpeed + (entity.parameters.acceleration * entity.parameters.timeAccelerating)

      if (entity.parameters.maxSpeed && currentSpeed > entity.parameters.maxSpeed) {
        currentSpeed = entity.parameters.maxSpeed
      } else {
        entity.parameters.timeAccelerating = entity.parameters.timeAccelerating + 1
      }
    }

    if (
      entity.position.y < 0 ||
      entity.position.y - currentSpeed < 0
    ) {
      if (entity.parameters.timeAccelerating !== null) {
        entity.parameters.timeAccelerating = 0
      }

      entity.position.y = 0
      return
    }

    entity.position.y = entity.position.y - currentSpeed
  },
  right: ({ entity, gameState, inputState }: InputProcessingLogicParams) => {
    if (inputState === "toDeactivate") {
      if (entity.parameters.timeAccelerating !== null) {
        entity.parameters.timeAccelerating = 0
      }
      return
    }

    let currentSpeed = entity.parameters.baseSpeed

    // Lógica de aceleração | vf = vi + (a ⋅ t)
    if (entity.parameters.acceleration !== null && entity.parameters.timeAccelerating !== null) {
      currentSpeed =
        entity.parameters.baseSpeed + (entity.parameters.acceleration * entity.parameters.timeAccelerating)

      if (entity.parameters.maxSpeed && currentSpeed > entity.parameters.maxSpeed) {
        currentSpeed = entity.parameters.maxSpeed
      } else {
        entity.parameters.timeAccelerating = entity.parameters.timeAccelerating + 1
      }
    }

    if (
      entity.position.x > gameState.canvas.width ||
      entity.position.x + entity.parameters.width > gameState.canvas.width ||
      entity.position.x + currentSpeed + entity.parameters.width >= gameState.canvas.width
    ) {
      if (entity.parameters.timeAccelerating !== null) {
        entity.parameters.timeAccelerating = 0
      }

      entity.position.x = gameState.canvas.width - entity.parameters.width
      return
    }

    entity.position.x = entity.position.x + currentSpeed
  },
  down: ({ entity, gameState, inputState }: InputProcessingLogicParams) => {
    if (inputState === "toDeactivate") {
      if (entity.parameters.timeAccelerating !== null) {
        entity.parameters.timeAccelerating = 0
      }
      return
    }

    let currentSpeed = entity.parameters.baseSpeed

    // Lógica de aceleração | vf = vi + (a ⋅ t)
    if (entity.parameters.acceleration !== null && entity.parameters.timeAccelerating !== null) {
      currentSpeed =
        entity.parameters.baseSpeed + (entity.parameters.acceleration * entity.parameters.timeAccelerating)

      if (entity.parameters.maxSpeed && currentSpeed > entity.parameters.maxSpeed) {
        currentSpeed = entity.parameters.maxSpeed
      } else {
        entity.parameters.timeAccelerating = entity.parameters.timeAccelerating + 1
      }
    }

    if (
      entity.position.y > gameState.canvas.height ||
      entity.position.y + entity.parameters.height > gameState.canvas.height ||
      entity.position.y + currentSpeed + entity.parameters.height >= gameState.canvas.height
    ) {
      if (entity.parameters.timeAccelerating !== null) {
        entity.parameters.timeAccelerating = 0
      }

      entity.position.y = gameState.canvas.height - entity.parameters.height
      return
    }

    entity.position.y = entity.position.y + currentSpeed
  },
}