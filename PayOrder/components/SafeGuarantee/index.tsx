import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Wrapper, Lock } from './styled';

const SafeGuarantee: React.FC = () => (
    <Wrapper>
        <Lock />
        <FormattedMessage
            id="safe_guarantee"
            defaultMessage="Мы используем 128-bit SSL защиту, что гарантирует высокий уровень безопасности"
        />
    </Wrapper>
);

export default SafeGuarantee;
