import styled from 'styled-components';

export const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 320px;
    grid-column-gap: 24px;
    width: 100%;
`;

export const Block = styled.div`
    width: 100%;
    border-radius: 12px;
    background-color: #fff;
    box-shadow: ${({ theme }) => theme.effects.cardMain};
`;

export const Column = styled.div`
    > * + * {
        margin-top: 24px;
    }
`;
