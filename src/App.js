import { Component } from "react";
import { ToastContainer } from "react-toastify";
import "./App.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";

// модалку приспособить

// компонент для тренировки
import Test from "./components/Test/Test";

const MY_API_KEY = "23246580-47279d47050c78840bfc8f048";

class App extends Component {
  state = {
    requestValue: "",

    // showModal: false,
  };

  // toggleModal = () => {
  //   this.setState((state) => ({
  //     showModal: !state.showModal,
  //   }))
  // }

  handleFormSubmit = (requestValue) => {
    this.setState({ requestValue });
  };

  render() {
    return (
      <div className="App">
        <Test />
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          requestValue={this.state.requestValue}
          keyApi={MY_API_KEY}
        />
        {/* <Button /> */}
        {/* {this.state.showModal && (
          <Modal onClose={this.toggleModal}>
            <h1>то что будет отображено в модалке</h1>
            <p>
              loremloremlorem loremloremlorem loremloremloreml oremloremlorem
            </p>

          </Modal>
        )} */}
        <ToastContainer autoClose={2500} />
        {/* <button type="button" onClick={this.toggleModal}>
          Открыть модалку
        </button> */}
      </div>
    );
  }
}

export default App;
