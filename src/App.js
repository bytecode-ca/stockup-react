import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ""
    };
  }
  addData = e => {
    this.setState({
      data: e.target.value
    });
  };
  add = () => {
    console.log(`Data: ${this.state.data}`);
  };
  render() {
    return (
      <div>
        <input type="text" onChange={this.addData} />
        <button onClick={this.add}>Add</button>
      </div>
    );
  }
}
export default App;
