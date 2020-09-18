import styled from 'styled-components';
import { Select } from '@crysp/kit';

export const StyledSelect: typeof Select = styled(Select)`
    width: 100%;
`;

export const Popular = styled.div`
    margin-top: 24px;
`;

export const TopCategory = styled.div`
    display: block;
    & > div {
        display: inline-block;
        white-space: nowrap;
        margin-right: 12px;
        margin-top: 12px;
        width: auto;
        cursor: pointer;
    }
`;
