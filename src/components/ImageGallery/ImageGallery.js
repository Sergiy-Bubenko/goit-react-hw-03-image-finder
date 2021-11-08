import { Component } from "react";
import Loader from "react-loader-spinner";
import ImageGalleryItem from "../ImageGalleryItem";
import Button from "../Button";
import Modal from "../Modal";

class ImageGallery extends Component {
  state = {
    pageNumber: 1,
    arrImages: null,
    error: null,
    status: "idle",
    showModal: false,
    modalImage: "",
  };

  componentDidUpdate(prevProps, prevState) {
    // console.log(prevProps)
    // console.log(prevState)
    // console.log(this.state)

    if (prevProps.requestValue !== this.props.requestValue) {
      this.setState({
        status: "pending",
        // arrImages: null
      });
      this.onRequest();
      //   fetch(
      //     `https://pixabay.com/api/?q=${this.props.requestValue}&page=${this.state.pageNumber}&key=${this.props.keyApi}&image_type=photo&orientation=horizontal&per_page=4`,
      //   )
      //     .then((response) => {
      //       if (response.ok) {
      //         return response.json()
      //       }

      //       return Promise.reject(
      //         new Error(`ошибка по запросу ${this.props.requestValue}`),
      //       )
      //     })
      //     .then((arr) => this.setState({ arrImages: arr, status: 'resolved' }))
      //     .catch((error) => this.setState({ error: error, status: 'rejected' }))
    }
  }
  onRequest = () => {
    fetch(
      `https://pixabay.com/api/?q=${this.props.requestValue}&page=${this.state.pageNumber}&key=${this.props.keyApi}&image_type=photo&orientation=horizontal&per_page=4`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        return Promise.reject(
          new Error(`ошибка по запросу ${this.props.requestValue}`)
        );
      })
      .then((arr) =>
        this.setState({
          arrImages: arr,
          status: "resolved",
        })
      )
      .catch((error) => this.setState({ error: error, status: "rejected" }));
  };

  // onLoadMore = () => {
  //   this.onRequest()
  //   this.setState((prevState) => ({
  //     pageNumber: prevState.pageNumber + 1,
  //   }))
  // }

  toggleModal = () => {
    this.setState((state) => ({
      showModal: !state.showModal,
    }));
    // console.log(evt.target)
    // console.log(evt.currentTarget)
    // this.givDateForModal(evt.currentTarget)
  };

  givLinkForModal = (e) => {
    console.log(e.currentTarget);

    const objId = this.state.arrImages.hits.find(
      (obj) => obj.id === Number(e.currentTarget.id)
    );

    this.setState({
      modalImage: objId.largeImageURL,
    });

    this.toggleModal();
  };

  // givLinkModal = () => {}

  render() {
    // console.log(this.state.arrImages)
    if (this.state.status === "idle") {
      return <div>The result of your request will be posted here</div>;
    }

    if (this.state.status === "pending") {
      return (
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000}
        />
      );
    }

    if (this.state.status === "rejected") {
      console.log(this.state.error);
      return <div>{this.state.error}</div>;
    }

    if (this.state.arrImages.hits.length === 0) {
      return (
        <div>
          There are no results for this request: "{this.props.requestValue}"
          Сhange request.
        </div>
      );
    }

    if (this.state.status === "resolved") {
      return (
        <>
          <ul className="ImageGallery">
            <ImageGalleryItem
              arrImages={this.state.arrImages}
              givLinkForModal={this.givLinkForModal}
            />
          </ul>
          {this.state.arrImages.hits.length > 0 && <Button />}
          {this.state.showModal && (
            <Modal onClose={this.toggleModal}>
              <img src={this.state.modalImage} alt="" />
            </Modal>
          )}
        </>
      );
    }
  }
}
export default ImageGallery;
