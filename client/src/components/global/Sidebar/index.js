import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import Logo from "../../../assets/images/logo.png";

const StyledNavLink = ({ className, children, ...props }) => (
  <NavLink {...props} className={className}>
    {children}
  </NavLink>
);

const Sidebar = styled.div`
  background: rgba(0, 0, 0, 0.24);
  width: 220px;
  height: 100vh;
  color: white;
  padding: 0 6px;
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 25px 0;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
`;

const Item = styled(StyledNavLink)`
  margin-bottom: 6px;
  padding: 6px 12px;
  &:hover {
    background: linear-gradient(
      to right,
      rgba(0, 58, 183, 1),
      rgba(0, 58, 183, 0.1)
    ) !important;
    color: #fff;
    border-radius: 25px;
  }
`;

const links = [
  {
    path: "/",
    label: "Dashboard",
  },
  {
    path: "/student",
    label: "Siswa",
  },
];

const index = () => {
  return (
    <Sidebar>
      <LogoContainer>
        <img src={Logo} />
        <div>SDIT Al-Manar</div>
        <div>Pekanbaru</div>
      </LogoContainer>
      <Menu>
        {links?.map((l, idx) => (
          <Item key={idx} exact to={l.path} activeClassName="active_route">
            {l.label}
          </Item>
        ))}
      </Menu>
    </Sidebar>
  );
};

export default index;
