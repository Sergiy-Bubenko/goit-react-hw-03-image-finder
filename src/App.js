import { Component } from "react";
import "./App.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import ImageGalleryItem from "./components/ImageGalleryItem";
import Button from "./components/Button";
import Loader from "react-loader-spinner";
// модалку приспособить
import Modal from "./components/Modal";

// компонент для тренировки
import Test from "./components/Test/Test";

const MY_API_KEY = "23246580-47279d47050c78840bfc8f048";

class App extends Component {
  state = {
    showModal: false,
    pageNumber: 1,
    searchValue: "all",
  };

  componentDidMount() {
    fetch(
      `https://pixabay.com/api/?q=${this.state.searchValue}&page=${this.state.pageNumber}&key=${MY_API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then((res) => res.json())
      .then((arr) => console.log("результаты запроса", arr));
  }

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
        <Test />
        <Searchbar onSubmit={this.Searchbar} />
        <ImageGallery />
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
