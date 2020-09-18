import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    padding: 0 20px;
    height: 60px;
    border: 1px solid ${({ theme }) => theme.colors.gray_25};
    border-radius: 12px;
    margin-bottom: 10px;
`;

export const TextBlock = styled.div`
    width: 368px;
`;

export const Title = styled.div`
    ${({ theme }) => theme.typography.label_16PxReg};
`;

export const Description = styled.div`
    ${({ theme }) => theme.typography.content_14px};
    color: ${({ theme }) => theme.colors.gray};
`;

export const Price = styled.div`
    ${({ theme }) => theme.typography.heading_18px};
    padding-left: 20px;
    float: right;
    vertical-align: middle;
    height: 28px;
    line-height: 28px;
    border-left: 1px solid ${({ theme }) => theme.colors.gray_25};
`;

export const IconStyled = styled.img`
    vertical-align: middle;
    width: 32px;
    height: 32px;
    margin: 0 12px;
`;
