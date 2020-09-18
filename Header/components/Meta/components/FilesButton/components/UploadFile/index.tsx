import React, { useRef, useEffect } from 'react';
import { useStore } from 'effector-react';
import { Wrapper, Input } from './styled';
import { $active } from '@client/pages/Order/model';
import { fx } from '@client/models/upload';
const { startUpload } = fx;

const UploadFile: React.FC = ({ children }) => {
    const activeOrder = useStore($active);
    const ref = useRef<HTMLInputElement>(null);

    const addFile = (): void => {
        ref.current?.click();
    };

    const onChange = (event): void => {
        const {
            target: {
                files: [file],
            },
        } = event;
        startUpload({ orderId: activeOrder as string, file });
    };

    return (
        <Wrapper onClick={addFile}>
            <Input type="file" ref={ref} onChange={onChange} />
            {children}
        </Wrapper>
    );
};

export default UploadFile;
