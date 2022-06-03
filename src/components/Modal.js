import React from "react";

function Modal(props) {
  return (
    <>
      <button
        type="button"
        class={props.buttonClassName}
        data-bs-toggle="modal"
        data-bs-target={"#" + props.modalId}
      >
        {props.buttonText}
      </button>
      <div
        className="modal fade"
        id={props.modalId}
        tabindex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-dark">{props.title}</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body text-dark text-start">{props.children}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
