import styled from 'styled-components';
import { Icon } from '@crysp/kit';

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    font: ${({ theme }) => theme.typography.heading_24px.font};
    white-space: nowrap;
    overflow: hidden;
    cursor: ${({ theme }) => (theme.editable ? 'pointer' : 'text')};
    transition: color 0.12s linear;
    &:empty {
        width: 500px;
        height: 24px;
        background: ${({ theme }) => theme.colors.gray_15};
        border-radius: 12px;
    }
    &:hover {
        color: ${({ theme }) => theme.colors[theme.editable ? 'purple' : 'black']};
    }
`;

export const EditIcon = styled(Icon.Edit2)`
    font-size: 20px;
    margin-left: 4px;
    margin-bottom: -1px;
    transition: color 0.12s linear;
    color: ${({ theme }) => theme.colors.gray};

    ${Wrapper}:hover & {
        color: inherit;
    }
`;

export const Description = styled.div`
    margin-top: 12px;
    font: ${({ theme }) => theme.typography.content_16px.font};
    color: ${({ theme }) => theme.colors.gray};
`;
