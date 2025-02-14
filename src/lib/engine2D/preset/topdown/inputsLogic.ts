import { ControlsHandlers, INPUT_STATE_ENUM } from "../../gameState"
import { calculateAcceleration, calculateVectorialAcceleration } from "../../utils/physics"

export const TOP_DOWN_CONTROLS_HANDLERS: ControlsHandlers = {
  left: ({ entity, inputState }) => {
    if (inputState === INPUT_STATE_ENUM.toDeactivate) {
      if (entity.parameters.timeAccelerating !== null) {
        entity.parameters.timeAccelerating = 0
      }
      return
    }

    const currentSpeed = calculateAcceleration({
      parameters: {
        acceleration: entity.parameters.acceleration,
        timeAccelerating: entity.parameters.timeAccelerating,
        baseSpeed: entity.parameters.baseSpeed,
        maxSpeed: entity.parameters.maxSpeed,
      },
      entity: entity,
    })

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
  up: ({ entity, inputState }) => {
    if (inputState === INPUT_STATE_ENUM.toDeactivate) {
      if (entity.parameters.timeAccelerating !== null) {
        entity.parameters.timeAccelerating = 0
      }
      return
    }

    const currentSpeed = calculateAcceleration({
      parameters: {
        acceleration: entity.parameters.acceleration,
        timeAccelerating: entity.parameters.timeAccelerating,
        baseSpeed: entity.parameters.baseSpeed,
        maxSpeed: entity.parameters.maxSpeed,
      },
      entity: entity,
    })

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
  right: ({ entity, gameState, inputState }) => {
    if (inputState === INPUT_STATE_ENUM.toDeactivate) {
      if (entity.parameters.timeAccelerating !== null) {
        entity.parameters.timeAccelerating = 0
      }
      return
    }

    const currentSpeed = calculateAcceleration({
      parameters: {
        acceleration: entity.parameters.acceleration,
        timeAccelerating: entity.parameters.timeAccelerating,
        baseSpeed: entity.parameters.baseSpeed,
        maxSpeed: entity.parameters.maxSpeed,
      },
      entity: entity,
    })

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
  down: ({ entity, gameState, inputState }) => {
    if (inputState === INPUT_STATE_ENUM.toDeactivate) {
      if (entity.parameters.timeAccelerating !== null) {
        entity.parameters.timeAccelerating = 0
      }
      return
    }

    const currentSpeed = calculateAcceleration({
      parameters: {
        acceleration: entity.parameters.acceleration,
        timeAccelerating: entity.parameters.timeAccelerating,
        baseSpeed: entity.parameters.baseSpeed,
        maxSpeed: entity.parameters.maxSpeed,
      },
      entity: entity,
    })

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
  leftUp: ({ entity, inputState }) => {
    if (inputState === INPUT_STATE_ENUM.toDeactivate) {
      if (entity.parameters.timeAccelerating !== null) {
        entity.parameters.timeAccelerating = 0
      }
      return
    }

    const currentSpeed = calculateVectorialAcceleration({
      parameters: {
        acceleration: entity.parameters.acceleration,
        timeAccelerating: entity.parameters.timeAccelerating,
        baseSpeed: entity.parameters.baseSpeed,
        maxSpeed: entity.parameters.maxSpeed,
      },
      entity
    })

    if (
      entity.position.x < 0 ||
      entity.position.x - currentSpeed < 0
    ) {
      if (entity.parameters.timeAccelerating !== null) {
        entity.parameters.timeAccelerating = 0
      }

      entity.position.x = 0
    } else {
      entity.position.x = entity.position.x - currentSpeed
    }

    if (
      entity.position.y < 0 ||
      entity.position.y - currentSpeed < 0
    ) {
      if (entity.parameters.timeAccelerating !== null) {
        entity.parameters.timeAccelerating = 0
      }

      entity.position.y = 0
    } else {
      entity.position.y = entity.position.y - currentSpeed
    }
  },
  leftDown: ({ entity, gameState, inputState }) => {
    if (inputState === INPUT_STATE_ENUM.toDeactivate) {
      if (entity.parameters.timeAccelerating !== null) {
        entity.parameters.timeAccelerating = 0
      }
      return
    }

    const currentSpeed = calculateVectorialAcceleration({
      parameters: {
        acceleration: entity.parameters.acceleration,
        timeAccelerating: entity.parameters.timeAccelerating,
        baseSpeed: entity.parameters.baseSpeed,
        maxSpeed: entity.parameters.maxSpeed,
      },
      entity
    })

    if (
      entity.position.x < 0 ||
      entity.position.x - currentSpeed < 0
    ) {
      if (entity.parameters.timeAccelerating !== null) {
        entity.parameters.timeAccelerating = 0
      }

      entity.position.x = 0
    } else {
      entity.position.x = entity.position.x - currentSpeed
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
    } else {
      entity.position.y = entity.position.y + currentSpeed
    }

  },
  rightUp: ({ entity, gameState, inputState }) => {
    if (inputState === INPUT_STATE_ENUM.toDeactivate) {
      if (entity.parameters.timeAccelerating !== null) {
        entity.parameters.timeAccelerating = 0
      }
      return
    }

    const currentSpeed = calculateVectorialAcceleration({
      parameters: {
        acceleration: entity.parameters.acceleration,
        timeAccelerating: entity.parameters.timeAccelerating,
        baseSpeed: entity.parameters.baseSpeed,
        maxSpeed: entity.parameters.maxSpeed,
      },
      entity
    })

    if (
      entity.position.x > gameState.canvas.width ||
      entity.position.x + entity.parameters.width > gameState.canvas.width ||
      entity.position.x + currentSpeed + entity.parameters.width >= gameState.canvas.width
    ) {
      if (entity.parameters.timeAccelerating !== null) {
        entity.parameters.timeAccelerating = 0
      }

      entity.position.x = gameState.canvas.width - entity.parameters.width
    } else {
      entity.position.x = entity.position.x + currentSpeed
    }

    if (
      entity.position.y < 0 ||
      entity.position.y - currentSpeed < 0
    ) {
      if (entity.parameters.timeAccelerating !== null) {
        entity.parameters.timeAccelerating = 0
      }

      entity.position.y = 0
    } else {
      entity.position.y = entity.position.y - currentSpeed
    }
  },
  rightDown: ({ entity, gameState, inputState }) => {
    if (inputState === INPUT_STATE_ENUM.toDeactivate) {
      if (entity.parameters.timeAccelerating !== null) {
        entity.parameters.timeAccelerating = 0
      }
      return
    }

    const currentSpeed = calculateVectorialAcceleration({
      parameters: {
        acceleration: entity.parameters.acceleration,
        timeAccelerating: entity.parameters.timeAccelerating,
        baseSpeed: entity.parameters.baseSpeed,
        maxSpeed: entity.parameters.maxSpeed,
      },
      entity
    })

    if (
      entity.position.x > gameState.canvas.width ||
      entity.position.x + entity.parameters.width > gameState.canvas.width ||
      entity.position.x + currentSpeed + entity.parameters.width >= gameState.canvas.width
    ) {
      if (entity.parameters.timeAccelerating !== null) {
        entity.parameters.timeAccelerating = 0
      }

      entity.position.x = gameState.canvas.width - entity.parameters.width
    } else {
      entity.position.x = entity.position.x + currentSpeed
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
    } else {
      entity.position.y = entity.position.y + currentSpeed
    }
  },
}