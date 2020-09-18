import React, { useCallback, useMemo } from 'react';
import { RadioButton } from '@crysp/kit';
import { SmsWrapper, Logo } from './styled';

import { useStore } from 'effector-react';
import { setPhoneMethodId } from '@client/pages/PayOrder/data/events';
import { $phoneMethodId } from '@client/pages/PayOrder/data/model';

enum MobilePaymentMethod {
    MTS,
    MEGAPHONE,
    BEELINE,
}

const SmsPayment: React.FC = () => {
    const phoneMethodId = useStore($phoneMethodId);

    const mobileMethod = useMemo(() => {
        switch (phoneMethodId) {
            case '3':
                return MobilePaymentMethod.MEGAPHONE;
            case '2':
                return MobilePaymentMethod.BEELINE;
            case '4':
                return MobilePaymentMethod.MTS;
        }
    }, [phoneMethodId]);

    const onChangeMethodHandler = useCallback(id => {
        setPhoneMethodId(id);
    }, []);

    return (
        <SmsWrapper>
            <RadioButton
                stroke
                label={<Logo src="/media/images/mts.svg" />}
                isChecked={mobileMethod === MobilePaymentMethod.MTS}
                onChange={isChecked => isChecked && onChangeMethodHandler('4')}
            />
            <RadioButton
                stroke
                label={<Logo src="/media/images/megaphone.svg" />}
                isChecked={mobileMethod === MobilePaymentMethod.MEGAPHONE}
                onChange={isChecked => isChecked && onChangeMethodHandler('3')}
            />
            <RadioButton
                stroke
                label={<Logo src="/media/images/beeline.svg" />}
                isChecked={mobileMethod === MobilePaymentMethod.BEELINE}
                onChange={isChecked => isChecked && onChangeMethodHandler('2')}
            />
        </SmsWrapper>
    );
};

export default SmsPayment;
