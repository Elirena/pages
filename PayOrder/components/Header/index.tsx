import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@crysp/kit';
import { Wrapper, Content } from './styled';

const Header: React.FC = props => {
    const history = useHistory();
    const onBack = useCallback(() => {
        history.goBack();
    }, [history]);

    return (
        <Wrapper {...props}>
            <Content>
                <Button primary color="white" icon="NextLeft" onClick={onBack}>
                    Назад
                </Button>
            </Content>
        </Wrapper>
    );
};

export default Header;
