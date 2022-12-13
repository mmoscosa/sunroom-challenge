import './App.css'
import React, { useCallback, useEffect, useState } from 'react'
import { createGlobalStyle, ThemeProvider } from 'styled-components'

import {
  Button,
  Window,
  WindowContent,
  WindowHeader,
  styleReset,
} from 'react95'
// pick a theme of your choice
import original from 'react95/dist/themes/original'
// original Windows95 font (optionally)
import ms_sans_serif from 'react95/dist/fonts/ms_sans_serif.woff2'
import ms_sans_serif_bold from 'react95/dist/fonts/ms_sans_serif_bold.woff2'

const GlobalStyles = createGlobalStyle`
  ${styleReset}
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif}') format('woff2');
    font-weight: 400;
    font-style: normal
  }
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif_bold}') format('woff2');
    font-weight: bold;
    font-style: normal
  }
  body {
    font-family: 'ms_sans_serif';
  }
`

// Create an empty 9 by 9 matrix
const defaultMatrix = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1],
]

// Spread 10 mines randomly across the matrix

function App() {
  const [matrix, setMatrix] = useState(defaultMatrix)
  const [gameStarted, setGameStarted] = useState(false)

  const revealMines = (clickedRow, clickedCol) => {
    const m = JSON.parse(JSON.stringify(matrix))
    if (m[clickedRow][clickedCol] === 1) {
      m[clickedRow][clickedCol] = '0'
      setMatrix(m)
      const neighbours = getNeighbours(clickedRow, clickedCol)

      console.log(getNeighbours(clickedRow, clickedCol))

      neighbours.forEach((element) => {})
    }
  }

  const getNeighbours = (y, x) => {
    const neighbours = []
    const currentRow = matrix[y]
    const prevRow = matrix[y - 1]
    const nextRow = matrix[y + 1]

    if (currentRow[x - 1]) neighbours.push([y, x - 1])
    if (currentRow[x + 1]) neighbours.push([y, x + 1])
    if (prevRow) {
      if (prevRow[x - 1]) neighbours.push([y - 1, x - 1])
      if (prevRow[x]) neighbours.push([y - 1, x])
      if (prevRow[x + 1]) neighbours.push([y - 1, x + 1])
    }
    if (nextRow) {
      if (nextRow[x - 1]) neighbours.push([y + 1, x - 1])
      if (nextRow[x]) neighbours.push([y + 1, x])
      if (nextRow[x + 1]) neighbours.push([y + 1, x + 1])
    }

    return neighbours
  }

  const putMines = (clickedRow, clickedCol, m) => {
    let minesPlaced = 0
    while (minesPlaced < 10) {
      // Generate random coordinates for the mine
      const row = Math.floor(Math.random() * 9)
      const col = Math.floor(Math.random() * 9)
      // avoid  mine in first clicked box
      if (clickedRow == row && clickedCol == col) {
        continue
      }
      // Check if the cell at the given coordinates is empty
      if (m[row][col] === 1) {
        // Place the mine in the cell
        m[row][col] = ''
        minesPlaced++
      }
    }
    return m
  }

  const checkMine = (clickedRow, clickedCol) => {
    if (!gameStarted) {
      setGameStarted(true)
      const mines = putMines(clickedRow, clickedCol, matrix)
      setMatrix(mines)
    }
    revealMines(clickedRow, clickedCol)
  }

  useEffect(() => {
    console.log(matrix)
  }, [matrix])

  return (
    <div className="App">
      <GlobalStyles />
      <ThemeProvider theme={original}>
        <Window className="window">
          <WindowHeader className="window-title">
            <span>Sunroom Minesweeper</span>
          </WindowHeader>
          <WindowContent>
            {matrix.map((rows, rindex) => {
              return (
                <div key={rindex} style={{ display: 'block' }}>
                  {rows.map((cols, cindex) => {
                    return (
                      <Button
                        active={cols === '0'}
                        key={`${rindex},${cindex}`}
                        onClick={() => {
                          checkMine(rindex, cindex)
                        }}
                      />
                    )
                  })}
                </div>
              )
            })}
          </WindowContent>
        </Window>
      </ThemeProvider>
    </div>
  )
}

export default App
