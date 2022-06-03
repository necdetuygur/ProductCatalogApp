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
        class="modal fade"
        id={props.modalId}
        tabindex="-1"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title text-dark">{props.title}</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body text-dark text-start">{props.children}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
