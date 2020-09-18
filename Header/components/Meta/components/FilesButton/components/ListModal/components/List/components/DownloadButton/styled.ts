import styled from 'styled-components';

export const Wrapper = styled.div<{ disabled?: boolean }>`
    display: inline-block;
    cursor: pointer;
    & > * {
        display: flex;
        align-items: center;
        color: ${({ theme, disabled }) => (disabled ? theme.colors.gray : theme.colors.purple)};
        vertical-align: middle;
        > svg {
            width: 24px;
            height: 24px;
            margin-right: 10px;
        }
    }
    ${({ disabled }) => (disabled ? 'pointer-events: none;' : '')}
    &:hover > * {
        color: ${({ theme }) => theme.colors.purpleHover};
    }
`;

export const Link = styled.a`
    display: none;
`;
