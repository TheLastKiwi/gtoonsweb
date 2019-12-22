import React from 'react';
import Game from './Components/Game'

class App extends React.Component {
  constructor(props){
    super(props)
    console.log("App constructor");

          /*
            We need to open a websocket before we do anything, it's the sole basis of communication once here
            Create a websocket session for matchmaking and wait at a screen until a match is found
            Then dispay the random card picking and displaying screen then a few sec later display the game board
            if a match isn't found then exit? and tell them to close the window? So the game would
            be a popup and I would need to keep track on the backend what users are in games?
            Or should we allow multiple concurrent sessions if the user so feels inclined
            Though that could be exploited by matching against yourself or literally yourself if you 
            are the only person in the queue. So bad idea don't allow multiple concurrent games.
          */
  };
    
  render(){
    console.log("app render");
    //Maybe out here control phase since matchmaking is only based on a response from the websocket and color choosing is timer based
    //There's no user input to check
    //Pass websocket to game so it can then monitor the socket for incomming data
    return (
      <Game />
    )
  };
}

export default App;
