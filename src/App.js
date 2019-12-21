import React from 'react';
import Game from './Components/Game'

class App extends React.Component {
  constructor(props){
    super(props)
    console.log("App constructor");

  };
    
  render(){
    console.log("app render");

    return (
      <Game />
    )
  };
}

export default App;
