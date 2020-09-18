import styled from 'styled-components';

export const PhoneMethodWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const Text = styled.span`
    ${({ theme }) => theme.typography.content_14px};
    margin-left: 16px;
    width: 268px;
`;
