import React from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";

const User = (user) => (
  <ListGroupItem key={user.clientId}>{user.username}</ListGroupItem>
);

export default function Users({ users }) {
  return (
    <div id="sidebar-wrapper">
      <div id="sidebar">
        <ListGroup>
          <ListGroupItem key="title">
            <i>Connected users</i>
          </ListGroupItem>
          {users.map(User)}
        </ListGroup>
      </div>
    </div>
  );
}
