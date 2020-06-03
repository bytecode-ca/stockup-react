import React from "react";

class CreateItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      category: "",
      quantity: 0,
      categoryList: [],
      success: false,
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
    });
  };
  changeName = (e) => {
    this.setState({
      name: e.target.value,
    });
  };
  onCategoryChange = (e) => {
    console.log(e.target.value);
    this.setState({
      category: e.target.value,
    });
  };
  onQuantityChange = (e) => {
    this.setState({
      quantity: e.target.value,
    });
  };
  clearAll = () => {
    this.setState({
      name: "",
      category: "",
      quantity: 0,
    });
  };
  submit = async () => {
    // get the value from state
    const { name, category, quantity } = this.state;

    // make a api call to store the value in database
    const response = await fetch("/api/item", {
      method: "post",
      body: JSON.stringify({
        name,
        categoryId: category,
        quantity,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // change the response (string) to json object
    const jsonResponse = await response.json();

    // print the response to the console
    console.log(`jsonResponse: `, jsonResponse);
    this.setState({
      success: true,
    });
    this.clearAll();
  };

  render() {
    const { name, category, quantity, categoryList, success } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-4">
            <h3 className="my-4 ">Create Item</h3>
            {success && (
              <div className="alert alert-success" role="alert">
                Item created successfully!
              </div>
            )}
            <div className="form-group">
              <label htmlFor="item-name">Item Name</label>
              <input
                id="item-name"
                type="text"
                value={name}
                className="form-control"
                onChange={this.changeName}
              />
            </div>
            <div className="form-group">
              <label htmlFor="cat">Category</label>
              <select
                id="cat"
                className="form-control"
                value={category}
                onChange={this.onCategoryChange}
              >
                <option value="">Select category</option>
                {categoryList.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="quantity">Quantity</label>
              <input
                id="quantity"
                className="form-control"
                type="number"
                value={quantity}
                onChange={this.onQuantityChange}
              />
            </div>

            <div className="mt-2">
              <button
                type="button"
                className="btn btn-primary btn-md btn-block"
                onClick={this.submit}
              >
                Create
              </button>

              {/* <button
                type="button"
                className="btn btn-primary btn-md btn-block"
                onClick={this.clearAll}
              >
                ClearAll
              </button> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateItem;
