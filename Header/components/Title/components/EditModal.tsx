import React, { useCallback, useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import { useStore } from 'effector-react';
import { Order } from '@client/types/gql';
import { Description } from '../styled';
import { Button, Modal, Input } from '@crysp/kit';
import { updateFields } from '../../../data/effects';

interface Props {
    defaultValue: string;
    visible: boolean;
    onClose(): void;
}

const EditModal: React.FC<Props> = ({ defaultValue, visible, onClose }) => {
    const { id } = useParams();
    const { formatMessage } = useIntl();
    const [title, setTitle] = useState(defaultValue);
    const pending = useStore(updateFields.pending);

    const onChange = useCallback(event => {
        setTitle(event.target.value);
    }, []);
    const onUpdate = useCallback(async () => {
        await updateFields({ id: id as Order['id'], title });
        onClose();
    }, [id, title, onClose]);

    useEffect(() => {
        setTitle(defaultValue);
    }, [defaultValue]);

    return (
        <Modal
            visible={visible}
            onClose={onClose}
            title={formatMessage({
                id: 'order_editTitle_modal_title',
                defaultMessage: 'Название задания',
            })}
            footer={
                <Button primary onClick={onUpdate} loading={pending}>
                    <FormattedMessage id="order_editTitle_modal_btn" defaultMessage="Сохранить" />
                </Button>
            }
        >
            <Input defaultValue={title} onChange={onChange} disabled={pending} width={'100%'} />
            <Description>
                <FormattedMessage
                    id="order_editTitle_description"
                    defaultMessage="Название должно привлечь внимание и отразить суть задания"
                />
            </Description>
        </Modal>
    );
};

export default EditModal;
