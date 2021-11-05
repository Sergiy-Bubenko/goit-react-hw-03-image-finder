import { Component } from "react";
import s from "./Modal.module.css";

class Modal extends Component {
  componentDidMount() {
    console.log("componentDidMount");
  }

  componentDidUpdate() {
    console.log("componentDidUnmount");
  }

  render() {
    return (
      <div className={s.Modal__backdrop}>
        <div className={s.Modal__content}>{this.props.children}</div>
      </div>
    );
  }
}

export default Modal;
