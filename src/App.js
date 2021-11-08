import { Component } from "react";
import { ToastContainer } from "react-toastify";
import "./App.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";

// модалку приспособить

const MY_API_KEY = "23246580-47279d47050c78840bfc8f048";

class App extends Component {
  state = {
    requestValue: "",
    // pageNumber: 1,
  };

  handleFormSubmit = (requestValue) => {
    this.setState({ requestValue });
  };

  render() {
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery
          requestValue={this.state.requestValue}
          pageNumber={this.state.pageNumber}
          keyApi={MY_API_KEY}
        />
        <ToastContainer autoClose={2500} />
      </div>
    );
  }
}

export default App;
