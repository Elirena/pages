import React, { useCallback } from 'react';
import { Input } from '@crysp/kit';
import { PhoneMethodWrapper, Text } from './styled';
import { FormattedMessage } from 'react-intl';

import { setPhone } from '@client/pages/PayOrder/data/events';

const PhoneMethod: React.FC = () => {
    const onChangeHandler = useCallback(e => {
        setPhone(e.target.value);
    }, []);

    return (
        <PhoneMethodWrapper>
            <Input
                type={'tel'}
                width={'258px'}
                isComplex
                size={56}
                label={
                    <FormattedMessage id="confirm_phone_number_label" defaultMessage="номер телефона" />
                }
                onChange={onChangeHandler}
            />
            <Text>
                <FormattedMessage
                    id="payment_sms_phone_description"
                    defaultMessage="Вы получите смс-сообщение, в котором нужно будет подтвердить оплату. Деньги спишутся с баланса вашего телефона."
                />
            </Text>
        </PhoneMethodWrapper>
    );
};

export default PhoneMethod;
