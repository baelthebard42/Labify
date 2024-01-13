import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

export default function NavBar({ IsLoggedIn, name, type }) {
  return (
    <Navbar expand="lg" data-bs-theme="dark" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/" style={{ marginLeft: "-1.5cm" }}>
          Labify
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!IsLoggedIn ? (
              <>
                <NavDropdown
                  style={{ marginRight: "0.5cm",marginLeft: "75vw" }}
                  title="Register"
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item href="/registerStd">
                    I'm a student
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/registerIns">
                    I'm a teacher
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Login" id="basic-nav-dropdown">
                  <NavDropdown.Item href="/loginStd">
                    I'm a student
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/loginIns">
                    I'm a teacher
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav style={{ marginRight: "0.5cm",marginLeft: "72vw" }}>
                  <Nav.Link href="#" className="mx-2 text-white">
                    {name}
                  </Nav.Link>
                  {type === "student" ? (
                    <Nav.Link href="/prelabtest" className="mx-2 text-white d-inline " style={{ display: "block" }}>
                      Quiz
                    </Nav.Link>
                  ) : (
                    <></>
                  )}

                  {type === "instructor" ? (
                    <Nav.Link href="/newlabsession" className="mx-2 text-white d-inline " style={{ display: "block" }}>
                      Add Session
                    </Nav.Link>
                  ) : (
                    <></>
                  )}

                  <Nav.Link href="/logout" className="mx-2 text-white">
                    Logout
                  </Nav.Link>
                </Nav>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
