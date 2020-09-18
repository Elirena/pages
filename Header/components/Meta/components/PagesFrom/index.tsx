import React, { useCallback, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useStore } from 'effector-react';
import { EditModal } from './components';
import { $pages } from '../../../../data/model';
import { Label, ChangeBtn, EditIcon } from './../styled';

const PagesFrom: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [pagesFrom, pagesTo] = useStore($pages);

    const onClose = useCallback(() => {
        setIsOpen(false);
    }, []);

    return (
        <tr>
            <td>
                <Label>
                    <FormattedMessage id="order_meta_pages_label" defaultMessage="Страницы" />
                </Label>
            </td>
            <td>
                <ChangeBtn onClick={() => setIsOpen(true)}>
                    <FormattedMessage
                        id="order_meta_pages_value"
                        defaultMessage="От {from} до {to}"
                        values={{ from: pagesFrom, to: pagesTo }}
                    />
                    <EditIcon />
                </ChangeBtn>
                <EditModal defaultValue={[pagesFrom, pagesTo]} visible={isOpen} onClose={onClose} />
            </td>
        </tr>
    );
};

export default PagesFrom;
