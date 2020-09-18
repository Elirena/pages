import styled, { css } from 'styled-components';

interface Props {
    active?: boolean;
}

export const List = styled.div`
    margin-top: 32px;
    display: flex;
    flex-wrap: wrap;
`;

export const active = css`
    color: ${({ theme }) => theme.colors.purpleHover} !important;
    cursor: default;
`;

export const TypeName = styled.div<Props>`
    white-space: nowrap;
    margin-bottom: 16px;
    width: 32.5%;
    font: ${({ theme }) => theme.typography.content_14px.font};
    & > a {
        ${props => props.active && active};
    }
`;
