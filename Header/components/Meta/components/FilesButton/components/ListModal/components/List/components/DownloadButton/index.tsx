import React, { useRef, useCallback } from 'react';
import { Wrapper, Link } from './styled';

interface Props {
    link?: string;
    disabled?: boolean;
}

const DownloadButton: React.FC<Props> = ({ link, disabled, children }) => {
    const ref = useRef<any>();

    const onClick = (): void => {
        ref.current?.click();
    };

    return (
        <Wrapper disabled={disabled} onClick={onClick}>
            <Link href={link} download="archive.zip" ref={ref} />
            {children}
        </Wrapper>
    );
};

export default DownloadButton;
