import React, { useEffect } from "react";
import { render } from "react-dom";
import Form from "@rjsf/bootstrap-4";
import Modal from "react-bootstrap/Modal";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import logo from "./images/logo.png";
import "./App.css";

const yaml = require("js-yaml");

function App() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [content, setContent] = React.useState("Transitioning...");
  const [formData, setFormData] = React.useState({});
  const [url, setUrl] = React.useState("");
  const [filename, setFilename] = React.useState("");

  useEffect(() => {
    var data = new Blob([content]);
    setUrl(URL.createObjectURL(data));
    var { vendor, model, variant } = formData;
    if (
      (vendor !== undefined && model !== undefined) ||
      variant !== undefined
    ) {
      var name = vendor.toLowerCase() + "_" + model.toLowerCase();
      if (variant !== undefined) {
        name = name + "-" + variant;
      }
      name = name + ".yaml";
      name = name.replace(" ", "-");
      name = name.replace(/[\u{0080}-\u{FFFF}]/gu, "");
      setFilename(name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

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

  fetch("schema.json", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
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
      <Navbar>
        <Nav>
          <Navbar.Brand href="#home">
            <img src={logo} alt="logo" className="logo"></img>
          </Navbar.Brand>
        </Nav>
        <Nav className="mr-0">
          <Nav.Link href="https://github.com/aparcar/devices/tree/main/form">
            Source Code
          </Nav.Link>
          <Nav.Link href="schema_doc.html">Schema</Nav.Link>
        </Nav>
      </Navbar>
      <div id="form" className="container form">
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
          <p className="button" onClick={hideModal}>
            Cancel
          </p>{" "}
          <a href={url} className="button" download={filename} type="text/yaml">
            Save
          </a>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default App;
