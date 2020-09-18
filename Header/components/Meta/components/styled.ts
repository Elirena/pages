import styled, { css } from 'styled-components';
import { Icon } from '@crysp/kit';

export const Label = styled.div`
    color: ${({ theme }) => theme.colors.gray};
    margin-right: 20px;
`;

export const Button = css`
    display: inline-flex;
    align-items: center;
    border: 0;
    background: none;
    padding: 0;
    cursor: pointer;
    outline: none;
    transition: color 0.12s linear;

    &:hover {
        color: ${({ theme }) => theme.colors.purple};
    }
`;

export const ChangeBtn = styled.button`
    ${Button};
`;

export const EditIcon = styled(Icon.Edit2)`
    font-size: 16px;
    margin-left: 4px;
    margin-bottom: 2px;
    transition: color 0.12s linear;
    color: ${({ theme }) => theme.colors.gray};

    ${ChangeBtn}:hover & {
        color: inherit;
    }
`;

export const DeleteButton = styled.button`
    color: ${({ theme }) => theme.colors.gray};
    ${Button};
`;

export const DeleteIcon = styled(Icon.Delete)`
    font-size: 16px;
    margin-left: 8px;
    margin-bottom: 3px;
    color: ${({ theme }) => theme.colors.gray};

    ${DeleteButton}:hover & {
        color: inherit;
    }
`;
