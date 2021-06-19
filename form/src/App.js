import React from "react";
import { render } from "react-dom";
import Form from "@rjsf/bootstrap-4";
import Modal from "react-bootstrap/Modal";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Select from 'react-select';
const yaml = require("js-yaml");

function App() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [content, setContent] = React.useState("Transitioning...");
  const [formData, setFormData] = React.useState({});



  const CustomSelect = function(props){
    
    return(
      <Select id="input"
      options={props.options.enumOptions}
      onChange={(e) => console.log(e)}
      >
      </Select>
    )
  }
  const widgets = {
    SelectWidget: CustomSelect
  }


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


  fetch("schema.json",      { headers : { 
    'Content-Type': 'application/json',
    'Accept': 'application/json'
   }})
    .then((response) => response.json())
    .then((schema) => {
      render(
        <>
          <Form schema={schema} 
                widgets={widgets}  
                onSubmit={onSubmit} 
                formData={formData} />
        </>,
        document.getElementById("form")
      );
    });
  return (
    <>
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="#home">OpenWrt Device Form</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="https://github.com/aparcar/devices/tree/main/form">
            Source Code
          </Nav.Link>
          <Nav.Link href="schema_doc.html">
            Schema
          </Nav.Link>
        </Nav>
      </Navbar>
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
