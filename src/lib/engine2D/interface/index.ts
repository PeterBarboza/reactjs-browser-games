export type EntityParameters = {
  width: number
  height: number
  baseSpeed: number
  maxSpeed: number
  acceleration: number
  timeAccelerating: number
} | {
  width: number
  height: number
  baseSpeed: number
  maxSpeed: null
  acceleration: null
  timeAccelerating: null
}

export type EntitySimpleControl = {
  key: string
  input: string
}

export type EntityCombinationControl = {
  key: string
  parts: Set<string>
}

export interface EntityState {
  id: string
  parameters: EntityParameters
  position: {
    x: number
    y: number
  }
  previousPosition: {
    x: number
    y: number
  } | null
  controls: {
    simple: EntitySimpleControl[] | null
    combination: EntityCombinationControl[] | null
  }
}

export interface CanvasState {
  width: number
  height: number
}
