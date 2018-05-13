import React from "react";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import Fish from "./Fish";
import sampleFishes from "../sample-fishes";
import base from "../base";

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };
  componentDidMount() {
    const { params } = this.props.match;

    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }

    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes"
    });
  }

  componentDidUpdate() {
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addFish = fish => {
    // 1. copy current state
    const fishes = { ...this.state.fishes };
    // 2. add new fish into fishes
    fishes[`fish${Date.now()}`] = fish;
    // 3. set the new fishes to state
    this.setState({
      fishes: fishes
    });
  };

  updateFish = (key, updatedFish) => {
    const fishes = { ...this.state.fishes };
    fishes[key] = updatedFish;
    this.setState({
      fishes: fishes
    });
  };

  deleteFish = key => {
    // 1.copy a state
    const fishes = { ...this.state.fishes };
    // 2. update the state
    fishes[key] = null;
    //3. update state
    this.setState({ fishes: fishes });
  };

  loadSampleFishes = () => {
    this.setState({
      fishes: sampleFishes
    });
  };

  addToOrder = key => {
    // 1. copy current state
    const order = { ...this.state.order };
    // 2. Either add to the order, or update the qty of our order
    order[key] = order[key] + 1 || 1;
    // 3. set new order to state
    this.setState({
      order: order
    });
  };

  removeFromOrder = key => {
    const order = { ...this.state.order };
    delete order[key];
    this.setState({ order: order });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => (
              <Fish
                addToOrder={this.addToOrder}
                key={key}
                index={key}
                details={this.state.fishes[key]}
              />
            ))}
          </ul>
        </div>
        <Order
          removeFromOrder={this.removeFromOrder}
          fishes={this.state.fishes}
          order={this.state.order}
        />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
        />
      </div>
    );
  }
}

export default App;
