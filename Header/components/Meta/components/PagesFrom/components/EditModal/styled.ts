import styled from 'styled-components';

export const Description = styled.div`
    margin-top: 12px;
    font: ${({ theme }) => theme.typography.content_16px.font};
    color: ${({ theme }) => theme.colors.gray};
`;

export const PagesLine = styled.div`
    display: flex;
    align-items: center;
`;

export const Separate = styled.span`
    margin: 0 8px;
    font-size: 24px;
`;
