import './App.css'
import React from 'react'
import Minesweeper from './components/Minesweeper'

function App() {
  return (
    <div className="App" class="windows-scrollbar">
      <div class="container">
        <div class="row mb-5">
          <div class="col-md-4 my-auto">
            <div class="card">
              <div class="card-header">
                <h4 class="my-0 font-weight-normal sunroom-header">
                  Sunroom Challenge {process.env.REACT_APP_ENV}
                </h4>
              </div>
              <div class="card-body">
                <Minesweeper />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
