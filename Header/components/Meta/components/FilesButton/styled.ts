import styled from 'styled-components';

export const Wrapper = styled.button`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 132px;
    padding: 0;
    border: 0;
    outline: none;
    background-color: ${({ theme }) => theme.colors.purple_7};
    border-radius: 12px;
    cursor: pointer;
    transition: background-color 0.12s linear;

    &:hover {
        background-color: ${({ theme }) => theme.colors.purple_10};
    }
`;

export const Text = styled.div`
    margin-top: 8px;
`;
