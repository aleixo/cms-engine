import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;
const ComponentsContainer = styled.div`
  display: flex;
  background-color: red;
  height: 100vh;
`;
const BuilderContainer = styled.div`
padding: 2rem;
`;

const LeftPanelContainer = styled.div`
display: 'flex';
flex: 1;
`;

export { Container, ComponentsContainer, BuilderContainer,LeftPanelContainer };
