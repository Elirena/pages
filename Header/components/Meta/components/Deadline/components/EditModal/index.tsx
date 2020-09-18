import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import { Button, Modal } from '@crysp/kit';
import { Order } from '@client/types/gql';
import { updateFields } from '../../../../../../data/effects';
import { Wrapper } from './styled';

interface Props {
    defaultValue: string;
    visible: boolean;
    onClose: () => void;
}

const EditModal: React.FC<Props> = ({ defaultValue, visible, onClose }) => {
    const { id } = useParams();
    const { formatMessage } = useIntl();
    const [deadline, setDeadline] = useState(defaultValue);

    const onChange = useCallback(event => {
        setDeadline(event.target.value);
    }, []);
    const onUpdate = useCallback(async () => {
        await updateFields({ id: id as Order['id'], deadline });
        onClose();
    }, [id, deadline, onClose]);

    useEffect(() => {
        setDeadline(defaultValue);
    }, [defaultValue]);

    return (
        <Modal
            title={formatMessage({
                id: 'order_meta_deadline_modal_title',
                defaultMessage: 'Срок сдачи',
            })}
            visible={visible}
            size={'small'}
            onClose={onClose}
            footer={
                <Button primary onClick={onUpdate}>
                    <FormattedMessage id="order_meta_modal_btn" defaultMessage="Сохранить" />
                </Button>
            }
        >
            <Wrapper>
                <input type="datetime" value={deadline} onChange={onChange} />
            </Wrapper>
        </Modal>
    );
};

export default EditModal;
