export interface EntityState {
  id: string
  parameters: {
    width: number
    height: number
    baseSpeed: number
  }
  position: {
    x: number
    y: number
  }
  previousPosition: {
    x: number
    y: number
  } | null
  inputs: [string, string][] | null
}

export interface CanvasState {
  width: number
  height: number
}
