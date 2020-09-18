import styled from 'styled-components';

export const Header = styled.div`
    padding: 26px 32px 20px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray_15};
`;

export const Main = styled.div`
    padding: 40px 32px;
`;

// todo: убрать когда пофиксим Select
interface RowProps {
    raised?: boolean;
}

export const Row = styled.div<RowProps>`
    position: relative;
    z-index: ${({ raised }) => (raised ? 200 : 100)};

    & + & {
        margin-top: 32px;
    }
`;

export const OptionTitle = styled.div`
    margin-bottom: 12px;
`;

export const Footer = styled.div`
    display: grid;
    grid-template-columns: 1fr 268px;
    grid-column-gap: 16px;
    margin-top: 32px;
`;

export const PrivacyText = styled.div`
    display: flex;
    align-items: center;
`;
