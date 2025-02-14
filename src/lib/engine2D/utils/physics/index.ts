import { EntityState } from "../../interface"

interface CalculateAccelerationParams {
  parameters: {
    acceleration: number | null
    timeAccelerating: number | null
    baseSpeed: number
    maxSpeed: number | null
  }
  entity: EntityState
}

interface CalculateVectorialMovementSpeedParams {
  parameters: {
    acceleration: number | null
    timeAccelerating: number | null
    baseSpeed: number
    maxSpeed: number | null
  }
  entity: EntityState
}

// Lógica de aceleração | velocidadeFinal = velocidadeInicial + (aceleração ⋅ tempo)
export function calculateAcceleration({
  parameters,
  entity,
}: CalculateAccelerationParams) {
  let newSpeed: number

  if (parameters.acceleration === null || parameters.timeAccelerating === null) {
    newSpeed = parameters.baseSpeed
    return newSpeed
  }

  newSpeed = parameters.baseSpeed + (parameters.acceleration * parameters.timeAccelerating)

  if (parameters.maxSpeed && newSpeed > parameters.maxSpeed) {
    newSpeed = parameters.maxSpeed
  } else {
    entity.parameters.timeAccelerating = parameters.timeAccelerating + 1
  }

  return newSpeed
}

// Lógica de aceleração com eixos | velocidade / √2
export function calculateVectorialAcceleration({
  parameters,
  entity,
}: CalculateVectorialMovementSpeedParams) {
  const newSpeed = calculateAcceleration({ parameters, entity })

  return Math.floor(newSpeed / Math.sqrt(2))
}