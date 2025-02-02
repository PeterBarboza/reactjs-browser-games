import { CanvasState, EntityState } from "./interface"

export type InputState = "active" | "toDeactivate" | "deactivated"

interface GameStateConstructor {
  canvas: CanvasState
}

export class GameState {
  private activeInputs = new Set<string>()
  private toDeactivateInputs = new Set<string>()
  entities: EntityState[] = []
  canvas: CanvasState

  constructor({ canvas }: GameStateConstructor) {
    this.canvas = canvas
  }

  activateInput(input: string) {
    this.activeInputs.add(input)
  }

  deactivateInput(input: string) {
    this.toDeactivateInputs.add(input)
    this.activeInputs.delete(input)
  }

  deactivateAllInputs() {
    this.toDeactivateInputs.clear()
    this.toDeactivateInputs = new Set(this.activeInputs)
    this.activeInputs.clear()
  }

  clearInput(input: string) {
    this.activeInputs.delete(input)
    this.toDeactivateInputs.delete(input)
  }

  clearAllInputs() {
    this.activeInputs.clear()
    this.toDeactivateInputs.clear()
  }

  getInputState(input: string): InputState {
    if (this.activeInputs.has(input)) {
      return "active"
    }

    if (this.toDeactivateInputs.has(input)) {
      return "toDeactivate"
    }

    return "deactivated"
  }
}
