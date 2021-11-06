import { Component } from "react";
import Loader from "react-loader-spinner";
import ImageGalleryItem from "../ImageGalleryItem";

class ImageGallery extends Component {
  state = {
    pageNumber: 1,
    arrImages: null,
    // loading: false,
    error: null,
    status: "idle",
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.requestValue !== this.props.requestValue) {
      this.setState({ status: "pending" });
      fetch(
        `https://pixabay.com/api/?q=${this.props.requestValue}&page=${this.state.pageNumber}&key=${this.props.keyApi}&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }

          return Promise.reject(
            new Error(`ошибка по запросу ${this.props.requestValue}`)
          );
        })
        .then((arr) => this.setState({ arrImages: arr, status: "resolved" }))
        .catch((error) => this.setState({ error: error, status: "rejected" }));
    }
  }
  render() {
    if (this.state.status === "idle") {
      return <div>Введите тексе запроса</div>;
    }

    if (this.state.status === "pending") {
      return (
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000} //3 secs
        />
      );
    }

    if (this.state.status === "rejected") {
      return <div>{this.state.error}</div>;
    }

    if (this.state.status === "resolved") {
      return (
        <ul className="ImageGallery">
          <ImageGalleryItem arrImages={this.state.arrImages} />
        </ul>
      );
    }

    // return (
    //   <ul className="ImageGallery">
    //     {this.state.arrImages && (
    //       <ImageGalleryItem arrImages={this.state.arrImages} />
    //     )}

    //     {this.state.loading && (
    //       <Loader
    //         type="Puff"
    //         color="#00BFFF"
    //         height={100}
    //         width={100}
    //         timeout={3000} //3 secs
    //       />
    //     )}
    //   </ul>
    // )
  }
}
export default ImageGallery;
