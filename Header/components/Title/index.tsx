import React, { useState, useCallback } from 'react';
import { useStore } from 'effector-react';
import { ThemeProvider } from 'styled-components';
import { $title } from '../../data/model';
import { EditModal } from './components';
import { Wrapper, EditIcon } from './styled';

interface Props {
    editable: boolean;
}

const Title: React.FC<Props> = ({ editable }) => {
    const title = useStore($title);
    const [isShow, setIsShow] = useState<boolean>(false);

    return (
        <ThemeProvider theme={theme => ({ ...theme, editable })}>
            <Wrapper onClick={() => setIsShow(true)}>
                {title}
                {editable && <EditIcon />}
            </Wrapper>
            <EditModal defaultValue={title} visible={isShow} onClose={() => setIsShow(false)} />
        </ThemeProvider>
    );
};

export default Title;
