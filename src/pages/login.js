import React from 'react'

import { useAuth0 } from '@auth0/auth0-react'

function Login() {
  const { loginWithRedirect } = useAuth0()
  return (
    <div className="App windows-scrollbar">
      <div className="container">
        <div className="row mb-5">
          <div className="col-md-4 my-auto">
            <div className="card">
              <div className="card-header">
                <h4 className="my-0 font-weight-normal sunroom-header">
                  Sunroom Challenge {process.env.REACT_APP_ENV}
                </h4>
              </div>
              <div className="card-body login">
                <button className="btn" onClick={() => loginWithRedirect()}>
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
