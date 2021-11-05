import { Component } from "react";
import "./App.css";
import Modal from "./components/Modal";

class App extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState((state) => ({
      showModal: !state.showModal,
    }));
  };
  render() {
    return (
      <div className="App">
        <button type="button" onClick={this.toggleModal}>
          Открыть модалку
        </button>
        {this.state.showModal && (
          <Modal>
            <h1>то что будет отображено в модалке</h1>
            <p>
              loremloremlorem loremloremlorem loremloremloreml oremloremlorem
              loremloremlorem loremloremlorem loremloremloreml oremloremlorem
            </p>
            <button type="button" onClick={this.toggleModal}>
              X
            </button>
          </Modal>
        )}
      </div>
    );
  }
}

export default App;
