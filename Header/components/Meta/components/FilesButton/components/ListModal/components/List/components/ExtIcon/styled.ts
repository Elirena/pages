import styled from 'styled-components';

export const Wrapper = styled.div`
    position: relative;
    display: inline-flex;
    box-sizing: border-box;
    width: 40px;
    height: 40px;
    justify-content: center;
    align-items: center;
    padding: 2px;
`;

export const Background = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
`;

export const Text = styled.div`
    position: relative;
    z-index: 10;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 0;
    // todo: bad font
    margin-bottom: -1px;
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    color: #ffffff;
`;
