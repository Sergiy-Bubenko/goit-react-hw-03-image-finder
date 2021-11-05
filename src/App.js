import { Component } from "react";
import "./App.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import Searchbar from "./components/Searchbar";
import ImageGalleryItem from "./components/ImageGalleryItem";
import Button from "./components/Button";
import Loader from "react-loader-spinner";

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

  Searchbar = () => {
    console.log("Searchbar");
  };
  render() {
    return (
      <div className="App">
        <Searchbar onSubmit={this.Searchbar} />
        <ImageGalleryItem />
        <Button />
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000} //3 secs
        />
        {this.state.showModal && (
          <Modal onClose={this.toggleModal}>
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
        <button type="button" onClick={this.toggleModal}>
          Открыть модалку
        </button>
      </div>
    );
  }
}

export default App;
