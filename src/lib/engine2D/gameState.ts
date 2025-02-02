import { CanvasState, EntityState } from "./interface"

interface GameStateConstructor {
  canvas: CanvasState
}

export class GameState {
  private activeInputs = new Set<string>()
  entities: EntityState[] = []
  canvas: CanvasState

  constructor({ canvas }: GameStateConstructor) {
    this.canvas = canvas
  }

  activateInput(input: string) {
    this.activeInputs.add(input)
  }

  deactivateInput(input: string) {
    this.activeInputs.delete(input)
  }

  isInputActive(input: string) {
    return this.activeInputs.has(input)
  }

  deactivateAllInputs() {
    this.activeInputs.clear()
  }
}
