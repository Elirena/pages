import styled from 'styled-components';
import { Icon } from '@crysp/kit';

export const Wrapper = styled.div`
    color: ${({ theme }) => theme.colors.gray};
    font: ${({ theme }) => theme.typography.content_14px.font};
`;

export const Lock = styled(Icon.Safety)`
    font-size: 20px;
    margin-right: 4px;
    vertical-align: text-bottom;
`;
