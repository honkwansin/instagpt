import React from 'react';
import { Landing } from './components/Pages';
// Point Eel web socket to the instance
export const eel = window.eel
eel.set_host( 'ws://localhost:8080' )

// Test anonymous function when minimized. See https://github.com/samuelhwilliams/Eel/issues/363
function show_log(msg:string) {
  console.log(msg)
}
window.eel.expose(show_log, 'show_log')

const App = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f4f3ee'
    }}>
      <Landing></Landing>
    </div>
  )
}

export default App;
