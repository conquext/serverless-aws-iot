import React, { useRef, useState } from "react";
import { Button, Form, FormControl, Modal } from "react-bootstrap";

export default function UserNamePrompt(props) {
  const [state, setState] = useState({ showModal: true });
  const input = useRef(null);

  const onSubmit = (event) => {
    if (input.current.value) {
      props.onPickUsername(input.current.value);
      setState({ showModal: false });
    }
    event.preventDefault();
  };

  const toggleModal = () => setState({ showModal: !state.showModal });

  return (
    <Modal show={state.showModal} onHide={toggleModal} bsSize="sm">
      <Form inline onSubmit={onSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Pick your username</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormControl
            type="text"
            placeholder="Type your username"
            ref={input}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit">Ok</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
