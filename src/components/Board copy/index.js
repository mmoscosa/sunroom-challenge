import React, { useEffect, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { GlobalStyles } from './BoardElements'
import { Button, Window, WindowContent, WindowHeader } from 'react95'

// original Windows95 font
import original from 'react95/dist/themes/original'

// Create an empty 9 by 9 matrix
const defaultMatrix = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
]

const Board = () => {
  const [matrix, setMatrix] = useState(defaultMatrix)
  const [gameStarted, setGameStarted] = useState(false)
  const blankState = 0
  const revealMines = (clickedRow, clickedCol) => {
    const m = JSON.parse(JSON.stringify(matrix))
    // if clicked box is empty
    if (m[clickedRow][clickedCol] === blankState) {
      // find the neighbouring cells containing
      const neighbours = getNeighbours(clickedRow, clickedCol)
      m[clickedRow][clickedCol] = '0'
      setMatrix(m)
      neighbours.forEach((element) => {
        revealMines(element[0], element[1])
        setMatrix(m)
      })
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
      if (clickedRow === row && clickedCol === col) {
        continue
      }
      // Check if the cell at the given coordinates is empty
      if (m[row][col] === blankState) {
        // Place the mine in the cell
        m[row][col] = '💣'
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

  useEffect(() => {}, [matrix])

  return (
    <>
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
    </>
  )
}

export default Board
