import './App.css';
import Card from './components/Card.jsx'
import React, { useState } from 'react';
import axios from 'axios';

// function App() {

//   const {imgSrc} = useState();


//   return (
//     <div><Card imgSrc='https://picsum.photos/300/200'/></div>
//   );
// }

// export default App;

class App extends React.Component {
  
  state = {details: [],}
  
  componentDidMount() {
    let data;
    axios.get('http://localhost:8000').then(response => {
      data = response.data;
      this.setState({
        details:data
      });
    })
    .catch(error => { })
  }

  render() {
    return (
      <div>
        <header> Data from Django </header>
        <hr></hr>
        {this.state.details.map((output, id) => (
          <div key={id}>
            <div>
              <Card imgSrc = "https://picsum.photos/300/200" cardName = {output.company} cardPrice = {output.price}></Card>
            </div>
          </div>
        ))}
      </div>
    )
  }

}

export default App;