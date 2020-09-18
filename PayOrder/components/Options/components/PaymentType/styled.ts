import styled from 'styled-components';
import { Icon } from '@crysp/kit';

interface Props {
    selected?: boolean;
    disabled?: boolean;
}

export const Payment = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const Gray = styled.span`
    color: ${({ theme }) => theme.colors.gray_50};
`;
export const PaymentWrapper = styled.div<Props>`
    white-space: nowrap;
    font: ${({ theme }) => theme.typography.heading_18px.font};
    & > div {
        width: 226px;
    }
`;

export const Question = styled(Icon.Question)`
    font-size: 20px;
    color: ${({ theme }) => theme.colors.gray};
`;

export const ToolStyled = styled.span`
    position: relative;
    left: 36px;
    top: 4px;
`;
