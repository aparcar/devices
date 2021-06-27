import React from "react";
import { render } from "react-dom";
import Form from "@rjsf/bootstrap-4";
import Modal from "react-bootstrap/Modal";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Select from "react-select";
import logo from "./images/logo.png"
import './App.css'

const yaml = require("js-yaml");

function App() {


  const [isOpen, setIsOpen] = React.useState(false);
  const [content, setContent] = React.useState("Transitioning...");
  const [formData, setFormData] = React.useState();


  const CustomSelect = function (props) {
    return (
      <Select
        id="input"
        className="basic-single"
        classNamePrefix="select"
      
        options={props.options.enumOptions}
        placeholder={props.label}
        isSearchable={true}
        
        onChange={async (e) => {
          await props.onChange(e.value);
        }}
      ></Select>
    );
  };
  const widgets = {
    SelectWidget: CustomSelect,
  };

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
          <Form
            key={formData}
            schema={schema}
            onSubmit={onSubmit}
            formData={formData}
            widgets={widgets}
          />
        </>,
        document.getElementById("form")
      );
    });
  return (
    <>
      <Navbar variant="dark">
      <Nav>
        <Navbar.Brand href="#home"><img src={logo} alt="logo"></img></Navbar.Brand>
        </Nav>
        <Nav className="mr-0" >
          <Nav.Link href="https://github.com/aparcar/devices/tree/main/form">
            Source Code
          </Nav.Link>
          <Nav.Link href="schema_doc.html">Schema</Nav.Link>
        </Nav>
      </Navbar>
      <div className="container" id="form">
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
