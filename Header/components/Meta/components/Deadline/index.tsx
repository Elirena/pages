import React, { useCallback, useState } from 'react';
import { FormattedDate, FormattedMessage } from 'react-intl';
import { useStore } from 'effector-react';
import { $deadline } from '../../../../data/model';
import { EditModal } from './components';
import { Label, ChangeBtn, EditIcon } from '../styled';

const Deadline: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const deadline = useStore($deadline);

    const onClose = useCallback(() => {
        setIsOpen(false);
    }, []);

    return (
        <tr>
            <td>
                <Label>
                    <FormattedMessage id="order_meta_deadline_label" defaultMessage="Сдать до" />
                </Label>
            </td>
            <td>
                <ChangeBtn onClick={() => setIsOpen(true)}>
                    <FormattedDate
                        value={deadline}
                        year="numeric"
                        month="long"
                        day="2-digit"
                        hour="numeric"
                        minute="numeric"
                    />
                    <EditIcon />
                </ChangeBtn>
                <EditModal defaultValue={deadline} visible={isOpen} onClose={onClose} />
            </td>
        </tr>
    );
};

export default Deadline;
