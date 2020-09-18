import React, { useState, useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import { useStore } from 'effector-react';
import { $type } from '../../../../data/model';
import { Label, ChangeBtn, EditIcon } from './../styled';
import { EditModal } from './components';

const Type: React.FC = () => {
    const type = useStore($type);
    const [isOpen, setIsOpen] = useState(false);

    const onClose = useCallback(() => {
        setIsOpen(false);
    }, []);

    return (
        <tr>
            <td>
                <Label>
                    <FormattedMessage id="order_meta_type_label" defaultMessage="Тип работы" />
                </Label>
            </td>
            <td>
                <ChangeBtn onClick={() => setIsOpen(true)}>
                    {type}
                    <EditIcon />
                </ChangeBtn>
                <EditModal defaultValue={type} visible={isOpen} onClose={onClose} />
            </td>
        </tr>
    );
};

export default Type;
