import styled from 'styled-components';

const Container = styled.div<{backgroundColor: string}>`
    padding: 2rem;
    background-color: ${props => props.backgroundColor};
    min-height: 100vh;
`;
export {Container}