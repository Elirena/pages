import styled from 'styled-components';

export const Wrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: middle;
`;

export const SuccessBlock = styled.div`
    width: 100%;
    padding: 16px;
    text-align: center;
    border-radius: 12px;
    background-color: ${({ theme }) => theme.colors.green_15};
    color: ${({ theme }) => theme.colors.green};
    font: ${({ theme }) => theme.typography.heading_18px.font};
    & > img {
        margin-right: 8px;
    }
`;

export const ConfirmDescription = styled.span`
    display: inline-block;
    color: ${({ theme }) => theme.colors.black};
    font: ${({ theme }) => theme.typography.content_14px.font};
`;

export const ConfirmBtnWrapper = styled.div`
    position: absolute;
    right: 120px;
    top: 5px;
`;

export const DescriptionBlock = styled.div`
    width: 268px;
`;
