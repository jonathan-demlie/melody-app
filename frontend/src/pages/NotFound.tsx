import React from "react";
import styled from "@emotion/styled";

const NotFound = () => {
  const NotFound = styled.div`
display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
`;

  return (
    <NotFound>
      <h1 style={{ fontSize: "4rem" }}>404</h1>
      <p style={{ fontSize: "2rem", marginLeft: "1rem" }}>Page Not Found</p>
    </NotFound>
  );
};

export default NotFound;
