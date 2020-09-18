import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Typography, Button } from '@crysp/kit';
import { SubTitle } from '../../styled';
import { Wrapper, Text } from './styled';
import UploadFile from '../../../UploadFile';

const { Title, Content } = Typography;

const Empty: React.FC = () => {
    return (
        <Wrapper>
            <Title level="2">
                <FormattedMessage
                    id="my_files_title"
                    defaultMessage="Мои файлы <gray>({count})</gray>"
                    values={{ gray: (...chunks) => <SubTitle>{chunks}</SubTitle>, count: 0 }}
                />
            </Title>
            <Text>
                <Content level="1">
                    <FormattedMessage
                        id="attach_files_to_your_order"
                        defaultMessage="Прикрепите файлы или фото к вашему заказу"
                    />
                </Content>
            </Text>
            <UploadFile>
                <Button primary icon="Attach">
                    <FormattedMessage id="attach_file" defaultMessage="Прикрепить файл" />
                </Button>
            </UploadFile>
        </Wrapper>
    );
};

export default Empty;
