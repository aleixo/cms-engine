import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: row;
    background-color: ${props => props.theme.colors.primary};
    justify-content: center;
    align-items: center;
    gap: 2rem;
    flex: 1;
    height: 100%;
    padding: 2rem;
`;

export { Container }