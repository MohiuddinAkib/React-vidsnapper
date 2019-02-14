import React from "react";
import { Navbar, NavbarBrand, Container } from "reactstrap";

const VidNavbar = () => {
  return (
    <header>
      <Navbar color="primary" dark={true} expand="md">
        <Container className="justify-content-center">
          <NavbarBrand className="font-weight-bold text-white">
            VidSnapper
          </NavbarBrand>
        </Container>
      </Navbar>
    </header>
  );
};

export default VidNavbar;
