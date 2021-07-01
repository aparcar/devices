import React, {useEffect} from "react";
import { render } from "react-dom";
import Form from "@rjsf/bootstrap-4";
import Modal from "react-bootstrap/Modal";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Select from "react-select";
import logo from "./images/logo.png";
import './App.css'

const yaml = require("js-yaml");

function App() {

  //document.getElementById
  const [isOpen, setIsOpen] = React.useState(false);
  const [content, setContent] = React.useState("Transitioning...");
  const [formData, setFormData] = React.useState({"vendor":""});
  const [url, setUrl] = React.useState("");
  useEffect(() =>{
    var data = new Blob([content]);
    setUrl(URL.createObjectURL(data));
  },[content])

  const CustomSelect = function (props) {
    return (
      <Select
        options={props.options.enumOptions}  
        placeholder={props.label}
        onChange={(e)=>{props.onChange(e.value)}}

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

  const download = () =>{
    var data = new Blob([content]);
    setUrl(URL.createObjectURL(data));
    var element = document.createElement('a');
    element.setAttribute('href',url);
    element.setAttribute('download',"device.yaml");
    document.body.appendChild(element);
    element.click();
  }

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
            onChange={async (e)=>{
              await setFormData(e.formData);
              setContent(yaml.safeDump(formData, { skipInvalid: true }));
              console.log(content)
              }}
            widgets={widgets}
          />
        </>,
        document.getElementById("form")
      );
    });
  return (
    <>
      <Navbar>
        <Nav>
          <Navbar.Brand href="#home"><img src={logo} className="logo" alt="logo"></img></Navbar.Brand>
        </Nav>
        <Nav className="mr-0" >
          <Nav.Link href="https://github.com/aparcar/devices/tree/main/form">
            Source Code
          </Nav.Link>
          <Nav.Link href="schema_doc.html">Schema</Nav.Link>
        </Nav>
      </Navbar>
      <div className="container">
      <div className="form" id="form">
        <p> Loading schemas...</p>
        
      </div>
      <button onClick={download} className="download btn btn-primary">Download Data</button>
      </div>
      <Modal show={isOpen} onHide={hideModal}>
        <Modal.Header>
          <Modal.Title>Device hardware configuration</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <pre>{content}</pre>
        </Modal.Body>
        <Modal.Footer>
          <p className="button" onClick={hideModal}>Cancel</p> <a className="button" href={url} download="Data.yaml" type="text/yaml">Save</a>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default App;

