import React from "react";
import { render } from "react-dom";
import Form from "@rjsf/bootstrap-4";
import Modal from "react-bootstrap/Modal";

const yaml = require("js-yaml");

function App() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [content, setContent] = React.useState("Transitioning...");
  const [formData, setFormData] = React.useState({});

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

  const onSubmit = ({ formData }, e) => {
    setFormData(formData);
    setContent(yaml.safeDump(formData, { skipInvalid: true }));
    showModal();
  };

  fetch("schema.json")
    .then((response) => response.json())
    .then((schema) => {
      render(
        <>
          <Form schema={schema} onSubmit={onSubmit} formData={formData} />
        </>,
        document.getElementById("form")
      );
    });
  return (
    <>
      <div id="form">
        <p> Loading schemas...</p>
      </div>
      <Modal show={isOpen} onHide={hideModal}>
        <Modal.Header>
          <Modal.Title>Device hardware configuration</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <pre>{content}</pre>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={hideModal}>Cancel</button> <button> Save </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default App;
