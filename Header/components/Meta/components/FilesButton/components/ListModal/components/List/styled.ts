import styled from 'styled-components';

export const Wrapper = styled.div`
    margin-bottom: -14px;
`;

export const ListContent = styled.div`
    margin: 32px -40px 22px;
    padding: 12px 40px;
    height: 256px;
    overflow: auto;
    border-top: 1px solid ${({ theme }) => theme.colors.gray_20};
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray_20};
`;

export const Actions = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const Header = styled.div`
    display: grid;
    grid-template-columns: 367px 1fr;
    grid-column-gap: 10px;
    & button {
        margin-top: -8px;
    }
`;
