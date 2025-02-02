import { ONE_SECOND_IN_MS } from "../constants"
import { GameState } from "../gameState"
import { Renderer } from "./interface"

interface GraphicEngine2DConstructor {
  renderingLoopConfig: {
    framesPerSecond: number
  }
  gameState: GameState
  renderer: Renderer
}

/*
 * TODO: Implementar lógica de "Interpolação de Renderização"
 * Nessa lógica, a engine gráfica irá comparar os dois últimos estados do jogo e "advinhar"
 * como o próximo frame deve ser desenhado com base nisso. Para isso será necessário salvar o timestamp
 * de quando cada estado foi gerado e também manter um histórico do estado do jogo, salvando pelo menos
 * o estado anterior, mantendo sempre o estado atual e o estado anterior para poder executar 
 * as lógicas de comparação.
 * 
 * A "Posição Interpolada", como é chamada essa "advinhação" do próximo frame, é obtida através da 
 * lógica descrita abaixo:
 * 
 * IntervaloDeRenderização = UmSegundoEmMilisegundos / FPS_DESEJADO
 * FraçãoDeTempoRestante = (TimestampEstadoAtual - TimestampEstadoAnterior) / IntervaloDeRenderização
 * PosiçãoInterpolada = PosiçãoAnterior + (FraçãoDeTempoRestante * (PosiçãoAtual - PosiçãoAnterior))
 */
export class GraphicEngine2D {
  renderingLoop: NodeJS.Timeout
  gameState: GameState
  renderer: Renderer

  constructor({ renderingLoopConfig, gameState, renderer }: GraphicEngine2DConstructor) {
    const renderingInterval = ONE_SECOND_IN_MS / renderingLoopConfig.framesPerSecond

    this.gameState = gameState
    this.renderer = renderer

    this.renderingLoop = setInterval(() => {
      this.render()
    }, renderingInterval)
  }

  render() {
    this.renderer.draw()
  }
}