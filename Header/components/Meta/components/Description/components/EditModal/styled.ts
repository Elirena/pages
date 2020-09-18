import styled from 'styled-components';

export const Textarea = styled.textarea`
    width: 100%;
    height: 152px;
    padding: 12px 20px;
    border: 1px solid ${({ theme }) => theme.colors.gray_25};
    box-sizing: border-box;
    border-radius: 12px;
    font: ${({ theme }) => theme.typography.content_18px.font};
    &:focus {
        border-radius: 12px;
        outline: none !important;
        border-color: ${({ theme }) => theme.colors.purple};
    }
`;
