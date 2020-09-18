import styled from 'styled-components';

export const SizeCellDefault = styled.div``;
export const SizeCellHover = styled.div`
    display: none;
`;

export const MetaTitle = styled.span``;

export const Wrapper = styled.div`
    display: grid;
    grid-template: 'check icon meta size download delete' 64px / 20px 40px auto 60px 40px 40px;
    grid-column-gap: 16px;
    align-items: center;
    cursor: pointer;
    &:not(:hover) button {
        border-color: transparent;
    }

    &:hover {
        ${SizeCellDefault} {
            display: none;
        }
        ${SizeCellHover} {
            display: block;
        }
        ${MetaTitle} {
            color: ${({ theme }) => theme.colors.purple};
        }
    }
`;

export const CheckCell = styled.div`
    grid-area: check;
    vertical-align: middle;
`;

export const IconCell = styled.div`
    grid-area: icon;
`;

export const MetaCell = styled.div`
    grid-area: meta;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    font: ${({ theme }) => theme.typography.content_16px.font};
`;

export const SizeCell = styled.div`
    grid-area: size;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font: ${({ theme }) => theme.typography.content_14px.font};
    color: ${({ theme }) => theme.colors.gray};
`;

export const DownloadCell = styled.div`
    grid-area: download;
`;

export const DeleteCell = styled.div`
    grid-area: delete;
`;

export const Published = styled.span`
    font: ${({ theme }) => theme.typography.content_14px.font};
    color: ${({ theme }) => theme.colors.gray};
`;

export const Progress = styled.div<{ value?: number }>`
    display: block;
    width: 100%;
    height: 3px;
    background-color: #eeeef1;
    position: relative;
    margin: 8px 0 9px;
    &:after {
        content: '';
        background-color: #8d34e7;
        position: absolute;
        width: ${({ value = 0 }) => Math.floor(value)}%;
        transition: width 0.5s;
        height: 3px;
    }
`;
