import { Component } from "react";
import Loader from "react-loader-spinner";
import ImageGalleryItem from "../ImageGalleryItem";
import Button from "../Button";
import Modal from "../Modal";

class ImageGallery extends Component {
  state = {
    pageNumber: 1,
    arrImages: [],
    error: null,
    status: "idle",
    showModal: false,
    modalImage: "",
  };

  componentDidUpdate(prevProps, prevState) {
    // console.log(prevProps)
    // console.log('prevState', prevState)
    // console.log('this.state', this.state)

    if (prevProps.requestValue !== this.props.requestValue) {
      this.setState({
        status: "pending",
        pageNumber: 1,
      });
      // onRequest = () => {

      this.onRequest()
        .then((arr) =>
          // console.log(arr),
          this.setState({
            arrImages: arr.hits,
            // prevState.arrImage > 0
            //   ? [...prevState.arrImage, arr.hits]
            //   : [...arr.hits],

            status: "resolved",
          })
        )
        .catch((error) => this.setState({ error: error, status: "rejected" }));
    }

    if (prevState.pageNumber !== this.state.pageNumber) {
      this.setState({
        status: "pending",
      });
      this.onRequest()
        .then(
          (arr) =>
            this.setState({
              arrImages: [...prevState.arrImages, ...arr.hits],
              status: "resolved",
            })
          // this.setState({
          //   arrImages:
          //     this.state.arrImage !== null
          //       ? [...this.state.arrImage, arr.hits]
          //       : [...arr.hits],

          //   status: 'resolved',
          // }),
        )
        .catch((error) => this.setState({ error: error, status: "rejected" }));
    }

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  }

  onRequest = () => {
    return fetch(
      `https://pixabay.com/api/?q=${this.props.requestValue}&page=${this.state.pageNumber}&key=${this.props.keyApi}&image_type=photo&orientation=horizontal&per_page=12`
    ).then((response) => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(
        new Error(`Ошибка по запросу ${this.props.requestValue}`)
      );
    });
  };

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

    const objId = this.state.arrImages.find(
      (obj) => obj.id === Number(e.currentTarget.id)
    );

    this.setState({
      modalImage: objId.largeImageURL,
    });

    this.toggleModal();
  };

  onLoadMore = () => {
    this.setState((prevState) => ({
      pageNumber: prevState.pageNumber + 1,
    }));
    // window.scrollTo({
    //   top: document.documentElement.scrollHeight,
    //   behavior: 'smooth',
    // })

    console.log("нажатие кнопки loadMore");
  };

  render() {
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
      return <div>{this.state.error}</div>;
    }

    if (this.state.arrImages.length === 0) {
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
          {this.state.arrImages.length > 0 && (
            <Button onLoadMore={this.onLoadMore} />
          )}
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
