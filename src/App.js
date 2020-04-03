import React from "react";
import _ from "lodash";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      categoryList: []
    };
  }
  componentDidMount() {
    this.fetchCategoryList();
  }
  fetchCategoryList = async () => {
    const response = await fetch("/api/category", {
      method: "get",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const body = await response.json();
    const { data } = body;
    this.setState({
      categoryList: data
    });
  };
  addData = e => {
    this.setState({
      data: e.target.value
    });
  };
  add = async () => {
    const res = await fetch("/api/category", {
      method: "post",
      body: JSON.stringify({ name: this.state.data }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await res.json();
    console.log(`Data: `, data);
    // added success
    this.fetchCategoryList();
  };
  render() {
    const { categoryList } = this.state;
    return (
      <div>
        <input type="text" onChange={this.addData} />
        <button onClick={this.add}>Add</button>
        <h4>Catgories</h4>
        {_.isEmpty(categoryList) && <small>No categories found..</small>}
        <ul>
          {categoryList.map((cat, index) => (
            <li key={index}>{cat.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}
export default App;
