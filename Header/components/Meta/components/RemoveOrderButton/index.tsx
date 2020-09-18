import React, { useCallback, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useParams, useHistory } from 'react-router-dom';
import { Modal } from '@crysp/kit';
import { Order } from '@client/types/gql';
import { DeleteButton, DeleteIcon } from '../styled';
import { deleteOrder } from '../../../../data/effects';
import { useStore } from 'effector-react';

const RemoveOrderButton: React.FC = () => {
    const history = useHistory();
    const { id } = useParams();
    const { formatMessage } = useIntl();
    const [confirmVisible, setConfirmVisible] = useState(false);
    const pending = useStore(deleteOrder.pending);

    const onClick = useCallback(() => {
        setConfirmVisible(true);
    }, []);
    const onApprove = useCallback(async () => {
        await deleteOrder(id as Order['id']);
        history.push('/home');
    }, [id, history]);
    const onCancel = useCallback(() => {
        setConfirmVisible(false);
    }, []);

    return (
        <>
            <DeleteButton onClick={onClick}>
                <FormattedMessage id="order_meta_delete" defaultMessage="Удалить заказ" />
                <DeleteIcon />
            </DeleteButton>
            <Modal
                title={formatMessage({
                    id: 'delete_order_confirmation_title',
                    defaultMessage: 'Хотите удалить заказ?',
                })}
                visible={confirmVisible}
                centred
                size={'small'}
                onClose={onCancel}
                onCancel={onCancel}
                onOk={onApprove}
                okText={formatMessage({
                    id: 'delete_order_approve',
                    defaultMessage: 'Удалить заказ',
                })}
            >
                <FormattedMessage
                    id="delete_order_confirmation_description"
                    defaultMessage="Введенные данные будут потеряны"
                />
            </Modal>
        </>
    );
};

export default RemoveOrderButton;
