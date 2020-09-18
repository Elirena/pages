import styled from 'styled-components';

export const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 27px 1fr;
    grid-column-gap: 16px;
`;

export const Title = styled.div`
    font: ${({ theme }) => theme.typography.content_16px.font};
`;

export const Description = styled.div`
    padding-right: 62px;
    font: ${({ theme }) => theme.typography.content_14px.font};
    color: ${({ theme }) => theme.colors.gray};
`;
