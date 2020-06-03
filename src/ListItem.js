import React from "react";

class ListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemlist: [],
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
    console.log(data);
    this.setState({
      itemlist: data,
    });
  };
  render() {
    const { itemlist } = this.state;
    return (
      <ul className="list-group mx-4">
        {itemlist.map((i) => (
          <li
            className="list-group-item d-flex justify-content-between align-items-center"
            key={i.id}
          >
            {i.name}:{i.category.name}
            <span className="badge badge-primary badge-pill">{i.quantity}</span>
          </li>
        ))}
      </ul>
    );
  }
}

export default ListItem;
