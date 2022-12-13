import React from 'react'
import Board from '../Board'

import './MinesweeperElements.css'

class Game extends React.Component {
  constructor(props) {
    super(props)

    this.boardElement = React.createRef()

    this.state = {
      height: 9,
      width: 9,
      mines: 10,
      gameStatus: '🙂',
    }
  }

  handleChange = (prop, value) => {
    this.setState({ [prop]: value })
  }

  // From https://dash.harvard.edu/bitstream/handle/1/14398552/BECERRA-SENIORTHESIS-2015.pdf article we set the levels and complexity
  handleChangeHeight = (event) => {
    const val = clamp(event.target.value, 5, 16)
    this.handleChange('height', val)
  }

  handleChangeWidth = (event) => {
    const val = clamp(event.target.value, 5, 30)
    this.handleChange('width', val)
  }

  handleChangeMines = (event) => {
    // Hardest game may have 99 mines, but otherwise customizable to anything between a math.floor from height and idth divided by 3
    let cap = Math.floor((this.state.height * this.state.width) / 3)
    cap = cap < 99 ? cap : clamp(event.target.value, 5, 99)
    const val = clamp(event.target.value, 1, cap)
    this.handleChange('mines', val)
  }

  restartGame = () => {
    this.boardElement.current.restartBoard()
  }

  render() {
    const { height, width, mines, gameStatus } = this.state

    return (
      <div className="game">
        <button
          onClick={this.restartGame}
          className="btn btn-lg btn-block sunroom-btn"
        >
          Restart
        </button>

        <Board
          ref={this.boardElement}
          height={height}
          width={width}
          mines={mines}
          gameStatus={gameStatus}
        />
        <div className="control-buttons">
          <form>
            <label>Height</label>
            <input
              type="number"
              value={this.state.height}
              onChange={this.handleChangeHeight}
            />
            <label>Width</label>
            <input
              type="number"
              value={this.state.width}
              onChange={this.handleChangeWidth}
            />
            <label>Mines</label>
            <input
              type="number"
              value={this.state.mines}
              onChange={this.handleChangeMines}
            />
          </form>
        </div>
      </div>
    )
  }
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(n, max))
}

export default Game
