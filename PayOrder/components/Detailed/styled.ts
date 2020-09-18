import styled from 'styled-components';
import { Icon } from '@crysp/kit';

export const Wrapper = styled.div`
    padding: 20px 32px 28px 32px;
`;

export const Header = styled.div`
    display: grid;
    grid-template-columns: 48px minmax(0, 1fr);
    grid-template-rows: 48px;
    grid-column-gap: 12px;
`;

export const Meta = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const OrderName = styled.div`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
    font: ${({ theme }) => theme.typography.content_16px.font};
    color: ${({ theme }) => theme.colors.gray};
`;

export const Divider = styled.div`
    width: 100%;
    height: 1px;
    margin: 20px 0;
    background: ${({ theme }) => theme.colors.gray_15};
`;

export const Row = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    & + & {
        margin-top: 8px;
    }
`;

export const RowTotal = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const Notifications = styled.div`
    display: flex;
    padding: 10px 20px 10px 16px;
    border-radius: 12px;
    margin-top: 12px;
    background: ${({ theme }) => theme.colors.pink_10};
`;

export const RowTitle = styled.span`
    font: ${({ theme }) => theme.typography.content_16px.font};
    margin-right: 10px;
`;

export const RowValue = styled.span`
    color: ${({ theme }) => theme.colors.green};
`;

export const Text = styled.div`
    display: inline-block;
    margin-left: 12px;
    font: ${({ theme }) => theme.typography.label_14pxSemibold.font};
`;

export const Subtext = styled.span`
    font: ${({ theme }) => theme.typography.content_14px.font};
`;

export const RowBalance = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
    margin: 16px 0;
    color: ${({ theme }) => theme.colors.gray};
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray_25};
    border-top: 1px solid ${({ theme }) => theme.colors.gray_25};
    & > span {
        color: ${({ theme }) => theme.colors.gray};
    }
`;

export const Question = styled(Icon.Question)`
    font-size: 20px;
    color: ${({ theme }) => theme.colors.gray};
`;

export const TooltipStyled = styled.div`
    display: inline-block;
    margin-left: 4px;
    & > div {
        vertical-align: middle;
    }
`;
