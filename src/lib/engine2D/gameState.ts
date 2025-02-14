import { CanvasState, EntityState } from "./interface"

export enum INPUT_STATE_ENUM {
  active,
  toDeactivate,
  deactivated,
}

export type InputState = INPUT_STATE_ENUM

interface InputProcessingLogicParams {
  entity: EntityState
  gameState: GameState
  inputState: InputState | null
}
export interface ControlsHandlers {
  [key: string]: (param: InputProcessingLogicParams) => void
}

interface GameStateConstructor {
  canvas: CanvasState
  controlsHandlers: ControlsHandlers
}

export class GameState {
  private activeInputs = new Set<string>()
  private toDeactivateInputs = new Set<string>()
  controlsHandlers: ControlsHandlers = {}
  entities: EntityState[] = []
  canvas: CanvasState

  constructor({ canvas, controlsHandlers }: GameStateConstructor) {
    this.canvas = canvas
    this.controlsHandlers = controlsHandlers
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
      return INPUT_STATE_ENUM.active
    }

    if (this.toDeactivateInputs.has(input)) {
      return INPUT_STATE_ENUM.toDeactivate
    }

    return INPUT_STATE_ENUM.deactivated
  }
}
