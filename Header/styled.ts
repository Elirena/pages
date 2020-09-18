import styled, { createGlobalStyle } from 'styled-components';

export const animationName = 'order-subtitle-slide';
export const Global = createGlobalStyle`
.${animationName}-enter, .${animationName}-appear {
    margin-top: -18px;
    opacity: 0;
}
.${animationName}-appear-active,.${animationName}-enter.${animationName}-enter-active {
    margin-top: 8px;
    opacity: 1;
    transition: margin-top 150ms linear, opacity 150ms linear;
}
.${animationName}-exit {
    margin-top: 8px;
    opacity: 1;
}
.${animationName}-exit.${animationName}-exit-active,.${animationName}-exit-done {
    margin-top: -18px;
    opacity: 0;
    transition: margin-top 150ms linear, opacity 150ms linear;
    pointer-events: none;
}
`;

export const Wrapper = styled.div`
    width: 100%;
    min-height: 112px;
    margin: 0 auto;
    display: grid;
    grid-template:
        'title expand' 112px
        'meta meta' auto / minmax(0, 1fr) max-content;
    transform: translateY(0);
`;

export const Inner = styled.div`
    grid-area: title;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    min-width: 0;
    overflow: hidden;

    &::after {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        width: 40px;
        background: linear-gradient(90deg, #ffffff00 0%, #fff 80%);
    }
`;

export const SubTitle = styled.div`
    display: flex;
    overflow: hidden;
    white-space: nowrap;
    align-items: center;
    height: 18px;
    margin-top: 8px;
    font: ${({ theme }) => theme.typography.content_18px.font};
    color: ${({ theme }) => theme.colors.gray};
    transform: translateY(0);
    &:empty {
        width: 350px;
        background: ${({ theme }) => theme.colors.gray_15};
        border-radius: 12px;
    }
`;

export const Divider = styled.div`
    width: 4px;
    height: 4px;
    border-radius: 50%;
    margin: 5px 8px;
    background-color: #83839750;
    flex-shrink: 0;
`;

export const ButtonCell = styled.div`
    grid-area: expand;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const Button = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font: ${({ theme }) => theme.typography.button_18px.font};
    height: 48px;
    border: 1px solid currentColor;
    color: #8d34e7;
    padding: 0 20px;
    background-color: transparent;
    outline: none;
    border-radius: 12px;
    transition: color 0.12s linear;

    &:hover {
        color: #9e52eb;
    }

    &:active {
        color: #782cc4;
    }
`;

export const MetaCell = styled.div`
    grid-area: meta;
    min-height: 0;
`;
