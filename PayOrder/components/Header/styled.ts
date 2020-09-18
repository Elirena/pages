import styled from 'styled-components';

export const Wrapper = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    min-height: 112px;
    transform: translateY(0);
`;

export const Content = styled.div`
    width: ${({ theme }) => theme.contentWidth}px;
    height: 112px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;
