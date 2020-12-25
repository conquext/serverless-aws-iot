import React from "react";
import { Nav, Navbar, NavItem } from "react-bootstrap";

const ChatHeader = ({ isConnected }) => (
  <Navbar fixedTop fluid>
    <Navbar.Header>
      <Navbar.Brand>Serverless IoT chat demo</Navbar.Brand>
    </Navbar.Header>
    <Nav>
      <NavItem>{isConnected ? "Connected" : "Not connected"}</NavItem>
    </Nav>
  </Navbar>
);

export default ChatHeader;
