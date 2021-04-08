import React from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";

import styled from "styled-components";

const Layout = ({ children }) => {
  const Main = styled.div`
    display: flex;
    background-image: radial-gradient(
      farthest-side at 100% 100%,
      rgba(22, 23, 41, 1),
      rgba(20, 21, 37, 0.4777),
      rgba(19, 19, 33, 0.1)
    );
    background-color: #333867;
  `;

  const Content = styled(Main)`
    flex-direction: column;
    flex: 1;
  `;

  const ChildContainer = styled.div`
    margin: 24px;
    height: 100%;
  `;
  return (
    <>
      <Main>
        <Sidebar />
        <Content>
          <Header />
          <ChildContainer>{children}</ChildContainer>
        </Content>
      </Main>
    </>
  );
};

export default Layout;
