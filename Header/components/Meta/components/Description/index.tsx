import React, { useCallback, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useStore } from 'effector-react';
import { Link } from '@crysp/kit';
import { $description } from '../../../../data/model';
import { Label, ChangeBtn, EditIcon } from './../styled';
import { EditModal } from './components';

const Description: React.FC = () => {
    const description = useStore($description);
    const [isOpen, setIsOpen] = useState(false);

    const onClose = useCallback(() => {
        setIsOpen(false);
    }, []);

    return (
        <tr>
            <td>
                <Label>
                    <FormattedMessage id="order_meta_description_label" defaultMessage="Описание" />
                </Label>
            </td>
            <td>
                {description !== '' ? (
                    <ChangeBtn onClick={() => setIsOpen(true)}>
                        {description}
                        <EditIcon />
                    </ChangeBtn>
                ) : (
                    <FormattedMessage
                        id="order_meta_description_empty_value"
                        defaultMessage="<a>Добавьте описание</a> чтобы авторам было проще оценить ваше задание"
                        values={{
                            a: (...chunks) => <Link onClick={() => setIsOpen(true)}>{chunks}</Link>,
                        }}
                    />
                )}
                <EditModal defaultValue={description} visible={isOpen} onClose={onClose} />
            </td>
        </tr>
    );
};

export default Description;
