import React from "react";
import { Container } from "reactstrap";

const PhotoContainer = (props, ref) => {
  return (
    <section className="mt-5">
      <Container>
        <div className="row" ref={ref} />
      </Container>
    </section>
  );
};

export default React.forwardRef(PhotoContainer);
