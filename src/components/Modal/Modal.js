import { Component } from "react";
import { createPortal } from "react-dom";
// import s from './Modal.module.css'

const modalRoot = document.querySelector("#modal-root");
console.log(modalRoot);

class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    if (e.code === "Escape") {
      this.props.onClose();
    }
  };

  handleBackdropClick = (evt) => {
    if (evt.currentTarget === evt.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      // <div className={s.Modal__backdrop} onClick={this.handleBackdropClick}>
      //   <div className={s.Modal__content}>{this.props.children}</div>
      // </div>,
      <div className="Overlay" onClick={this.handleBackdropClick}>
        <div className="Modal">{this.props.children}</div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
