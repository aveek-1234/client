import './App.css';
import {useState, useEffect} from 'react';
import io from 'socket.io-client';
require('dotenv').config()
const socket = io.connect(process.env.REACT_APP_HTTP);
console.log(process.env.REACT_APP_HTTP);
var name = prompt("Enter your name");
console.log(name);
function App() {
  const [message, setmessage] = useState('');
  const [chat, setchat] = useState([]);
    const sendchat=(e)=>{
       e.preventDefault()
       if(message===""){
         return;
       }
       socket.emit("chat",{message,name})
       setmessage('');
    }

    useEffect(()=>{
      socket.on("chat",(payload)=>{
        setchat([...chat,payload])
      })
    })
    const Chats=()=>{
      
      return(
      chat.map((payload,index)=>{
        return(

          <p className={(payload.name===name)? "send":"recieve"}>{payload.name}  :  {payload.message}</p>
        )
      })
     
      )
  }
    return(
    <div className="App">
      <header className="App-header">
        <h1>Chatter</h1>
        <Chats className="chats" />
        <form onSubmit={sendchat}>
          <input type="text" 
          name="chat"
          className="getchat" 
          placeholder="Write a message" 
          value={message} 
          onChange={(e)=>{setmessage(e.target.value)}}>
          </input>
          <button type="submit"> Send</button>
        </form>
      </header>
    </div>
    );
}

export default App;
