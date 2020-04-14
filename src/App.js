import React from "react";
import _ from "lodash";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      categoryList: [],
      loading: true,
    };
  }
  componentDidMount() {
    this.fetchCategoryList();
  }
  fetchCategoryList = async () => {
    const response = await fetch("/api/category", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const body = await response.json();
    const { data } = body;
    this.setState({
      categoryList: data,
      loading: false,
    });
  };
  addData = (e) => {
    console.log(e.target.value);
    this.setState({
      data: e.target.value,
    });
  };
  add = async () => {
    // get the value from state
    const { data } = this.state;

    // make a api call to store the value in database
    const response = await fetch("/api/category", {
      method: "post",
      body: JSON.stringify({ name: data }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // change the response (string) to json object
    const jsonResponse = await response.json();

    // print the response to the console
    console.log(`jsonResponse: `, jsonResponse);

    this.setState({ data: "" });

    // (to show the updates list) get all the values from the database
    this.fetchCategoryList();
  };
  render() {
    const { categoryList, loading, data } = this.state;
    return (
      <div>
        <input type="text" value={data} onChange={this.addData} />
        <button onClick={this.add}>Add</button>
        <h4>Catgories</h4>
        {loading && <h6>Loading.. please wait</h6>}
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
