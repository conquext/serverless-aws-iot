import React, { useRef } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  InputGroup,
  ListGroup,
  ListGroupItem,
  Navbar,
  Row,
} from "react-bootstrap";
import Users from "./Users";

const ChatInput = ({ onSend }) => {
  const input = useRef(null);

  const onSubmit = (event) => {
    onSend(input.current.value);
    input.current.value = "";
    event.preventDefault();
  };

  return (
    <Navbar fixedBottom fluid>
      <Col xs={9} xsOffset={3}>
        <Form inline onSubmit={onSubmit}>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Type your message"
              ref={input}
            />
            <Button type="submit">Send</Button>
            {/* <InputGroup.Button>
            </InputGroup.Button> */}
          </InputGroup>
        </Form>
      </Col>
    </Navbar>
  );
};

const Message = (message) => (
  <ListGroupItem key={message.id}>
    <b>{message.username}</b> : {message.message}
  </ListGroupItem>
);

const ChatMessages = ({ messages }) => (
  <div id="messages">
    <ListGroup>
      <ListGroupItem key="title">
        <i>Messages</i>
      </ListGroupItem>
      {messages.map(Message)}
    </ListGroup>
  </div>
);

const ChatWindow = ({ users, messages, onSend }) => (
  <div>
    <Container fluid>
      <Row>
        <Col xs={3}>
          <Users users={users} />
        </Col>
        <Col xs={9}>
          <ChatMessages messages={messages} />
        </Col>
      </Row>
    </Container>
    <ChatInput onSend={onSend} />
  </div>
);

export default ChatWindow;
