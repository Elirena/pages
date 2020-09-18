import React, { useCallback, useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Button, Link, Input } from '@crysp/kit';
import { Wrapper, SuccessBlock, DescriptionBlock, ConfirmDescription, ConfirmBtnWrapper } from './styled';

enum ConfirmPhoneStages {
    CONFIRM_PHONE,
    CONFIRM_CODE,
    PHONE_SUCCESS,
}

const ConfirmPhone: React.FC = () => {
    const [confirmStage, setConfirmStage] = useState<ConfirmPhoneStages>(ConfirmPhoneStages.CONFIRM_PHONE);
    const [phoneValue, setPhoneValue] = useState('');

    const isDisabled = useMemo(() => phoneValue.length === 0, [phoneValue.length]);

    const onChangeHandler = useCallback(({ target: { value } }) => {
        setPhoneValue(value);
    }, []);

    const onConfirmPhoneHandler = useCallback(() => {
        setConfirmStage(ConfirmPhoneStages.CONFIRM_CODE);
    }, []);

    const onGoBackHandler = useCallback(() => {
        setConfirmStage(ConfirmPhoneStages.CONFIRM_PHONE);
        setPhoneValue('');
    }, []);

    return (
        <Wrapper>
            {confirmStage === ConfirmPhoneStages.CONFIRM_PHONE && (
                <>
                    <Input
                        type={'tel'}
                        isComplex
                        size={56}
                        width={'436px'}
                        onChange={onChangeHandler}
                        label={
                            <FormattedMessage
                                id="confirm_phone_number_label"
                                defaultMessage="номер телефона"
                            />
                        }
                    />
                    <ConfirmBtnWrapper>
                        <Button primary disabled={isDisabled} onClick={onConfirmPhoneHandler}>
                            <FormattedMessage
                                id="confirm_phone_code_btn"
                                defaultMessage="Отправить код"
                            />
                        </Button>
                    </ConfirmBtnWrapper>
                </>
            )}
            {confirmStage === ConfirmPhoneStages.CONFIRM_CODE && (
                <>
                    <Input
                        type={'password'}
                        isComplex
                        size={56}
                        width={'268px'}
                        label={
                            <FormattedMessage
                                id="confirm_phone_number_code"
                                defaultMessage="код подтверждения"
                            />
                        }
                    />
                    <DescriptionBlock>
                        <ConfirmDescription>
                            <FormattedMessage
                                id="confirm_phone_code_sent"
                                defaultMessage="Мы отправили вам код подтверждения на номер <span>телефона</span>"
                                values={{
                                    span: (...chunks) => <span>{phoneValue}</span>,
                                }}
                            />
                        </ConfirmDescription>
                        <Link onClick={onGoBackHandler}>
                            <FormattedMessage
                                id="confirm_phone_back_btn"
                                defaultMessage="Вернуться"
                            />
                        </Link>
                    </DescriptionBlock>
                </>
            )}
            {confirmStage === ConfirmPhoneStages.PHONE_SUCCESS && (
                <SuccessBlock>
                    <img src="/media/images/success.svg" />
                    <span>
                        <FormattedMessage
                            id="confirm_phone_success"
                            defaultMessage="Телефон подтвержден!"
                        />
                    </span>
                </SuccessBlock>
            )}
        </Wrapper>
    );
};

export default ConfirmPhone;
