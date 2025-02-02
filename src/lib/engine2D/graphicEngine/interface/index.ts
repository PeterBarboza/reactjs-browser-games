import { GameState } from "../../gameState"

export interface Renderer {
  gameState: GameState

  draw: () => void
}