import styled, { createGlobalStyle } from 'styled-components';

const maxHeight = 350;

export const Global = createGlobalStyle`
.expand-appear, .expand-enter {
    max-height: 0;
    opacity: 0;
}
.expand-enter-done {
    max-height: ${maxHeight}px;
    opacity: 1;
}
.expand-appear-active,.expand-enter.expand-enter-active {
    max-height: ${maxHeight}px;
    opacity: 1;
    transition: max-height 120ms ease-in-out, opacity 120ms linear;
}
.expand-exit {
    max-height: ${maxHeight}px;
    opacity: 1;
}
.expand-exit-done {
    max-height: 0;
    opacity: 0;
}
.expand-exit.expand-exit-active {
    max-height: 0;
    opacity: 0;
    transition: max-height 120ms ease-in-out, opacity 120ms linear;
}
`;

export const Wrapper = styled.div`
    max-height: 0;
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
`;

export const ParamsTable = styled.table`
    td {
        padding: 8px 0;
    }
    tr:first-child td {
        padding-top: 0;
    }
    tr td:first-child {
        width: 18%;
    }
    tr:last-child td {
        padding-bottom: 0;
    }
`;

export const Label = styled.div`
    color: ${({ theme }) => theme.colors.gray};
    margin-right: 20px;
`;

export const Divider = styled.div`
    height: 1px;
    margin: 20px 0;
    background-color: ${({ theme }) => theme.colors.gray_15};
`;

export const Footer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0 20px 0;
`;

export const Column = styled.div`
    display: flex;
    align-items: center;
    font: ${({ theme }) => theme.typography.content_16px.font};

    & > * + * {
        margin-left: 60px;
    }
`;

export const Gray = styled.span`
    color: ${({ theme }) => theme.colors.gray};
`;

export const Content = styled.div`
    display: grid;
    grid-template-columns: auto 200px;
    grid-column-gap: 32px;
`;
