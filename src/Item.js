import React from "react";
import _ from "lodash";

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemList: [],
      loading: true,
    };
  }
  componentDidMount() {
    this.fetchItemList();
  }
  fetchItemList = async () => {
    const response = await fetch("/api/item", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const body = await response.json();
    const { data } = body;
    this.setState({
      itemList: data,
      loading: false,
    });
  };

  render() {
    const { itemList, loading } = this.state;
    return (
      <div>
        <h4>Items</h4>
        {loading && <h6>Loading.. please wait</h6>}
        {_.isEmpty(itemList) && <small>No items found..</small>}
        <ul>
          {itemList.map((item, index) => (
            <li key={index}>{item.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}
export default Item;
