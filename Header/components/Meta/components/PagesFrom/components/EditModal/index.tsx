import React, { useCallback, useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import { useStore } from 'effector-react';
import { Description, Separate, PagesLine } from './styled';
import { Button, Modal, Input } from '@crysp/kit';
import { Order } from '@client/types/gql';
import { updateFields } from '../../../../../../data/effects';
import { $typeId } from '@client/pages/Order/components/Header/data/model';
import { getSuggestPages, $suggestPages } from './data/model';

interface Props {
    defaultValue: [number, number];
    visible: boolean;
    onClose: () => void;
}

const EditModal: React.FC<Props> = ({ defaultValue, visible, onClose }) => {
    const { id } = useParams();
    const { formatMessage } = useIntl();
    const [pagesFrom, setPagesFrom] = useState('5');
    const [pagesTo, setPagesTo] = useState('10');
    const pending = useStore(updateFields.pending);
    const typeId = useStore($typeId);
    const suggestPages = useStore($suggestPages);

    function changeField(fn) {
        return function(event) {
            fn(event.target.value);
        };
    }
    const onChangeFrom = changeField(setPagesFrom);
    const onChangeTo = changeField(setPagesTo);
    const onUpdate = useCallback(async () => {
        await updateFields({
            id: id as Order['id'],
            pagesFrom: parseInt(pagesFrom, 10),
            pagesTo: parseInt(pagesTo, 10),
        });
        onClose();
    }, [id, pagesTo, pagesFrom, onClose]);

    useEffect(() => {
        if (defaultValue) {
            setPagesFrom(defaultValue[0].toString());
            setPagesTo(defaultValue[1].toString());
        }
    }, [defaultValue]);

    useEffect(() => {
        getSuggestPages(typeId);
    }, [typeId]);

    return (
        <Modal
            title={formatMessage({
                id: 'order_meta_pages_modal_title',
                defaultMessage: 'Кол-во страниц',
            })}
            visible={visible}
            onClose={onClose}
            size={'default'}
            footer={
                <Button primary onClick={onUpdate} loading={pending}>
                    <FormattedMessage id="order_meta_modal_btn" defaultMessage="Сохранить" />
                </Button>
            }
        >
            <PagesLine>
                <Input defaultValue={pagesFrom} type={'number'} prefix={'от'} onChange={onChangeFrom} width={'148px'} />
                <Separate> - </Separate>
                <Input defaultValue={pagesTo} type={'number'} prefix={'до'} onChange={onChangeTo} width={'148px'} />
            </PagesLine>
            <Description>
                <FormattedMessage
                    id="order_meta_pages_description"
                    defaultMessage="Для {namePluralGenitive} обычно кол-во страниц от {from} до {to}"
                    values={{
                        namePluralGenitive: suggestPages?.namePluralGenitive,
                        from: suggestPages?.from,
                        to: suggestPages?.to,
                    }}
                />
            </Description>
        </Modal>
    );
};

export default EditModal;
