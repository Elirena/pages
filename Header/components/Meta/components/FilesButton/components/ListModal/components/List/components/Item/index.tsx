import React, { useMemo } from 'react';
import { FormattedMessage, FormattedDate, useIntl } from 'react-intl';
import { dropFile } from '@client/models/upload';
import { check, uncheck } from '../../data/model';
import { Button, Tooltip, Checkbox } from '@crysp/kit';
import ExtIcon from '../ExtIcon';
import {
    Wrapper,
    CheckCell,
    IconCell,
    MetaCell,
    DownloadCell,
    SizeCell,
    DeleteCell,
    Published,
    SizeCellDefault,
    SizeCellHover,
    Progress,
    MetaTitle,
} from './styled';
import moment from 'moment';

interface Props {
    fileType?: string;
    fileName: string;
    creation: number;
    fileSizeInMb?: number;
    bytesLength?: number;
    filePath: string;
    progress?: number;
    fileHash: string;
}

const MAX_NAME_LENGTH = 40;
const POSTFIX_LENGTH = 7;

const Item: React.FC<Props> = ({
    fileType,
    fileName,
    creation,
    fileSizeInMb,
    bytesLength = 0,
    filePath,
    progress,
    fileHash,
}) => {
    const { formatMessage } = useIntl();

    const size = useMemo(() => {
        if (fileSizeInMb) {
            return fileSizeInMb;
        }
        return Math.floor(bytesLength / 1024 / 1024);
    }, [bytesLength, fileSizeInMb]);

    const name = useMemo(() => {
        if (fileName.length <= MAX_NAME_LENGTH) {
            return fileName;
        }
        return `${fileName.slice(0, MAX_NAME_LENGTH - POSTFIX_LENGTH - 1)}...${fileName.slice(-POSTFIX_LENGTH)}`;
    }, [fileName]);

    const drop = (): void => {
        dropFile({ fileHash });
    };

    const onCheck = (value, isChecked): void => {
        if (isChecked) {
            check(value);
        } else {
            uncheck(value);
        }
    };

    const preview = (): void => {
        console.log('PREVIEW', filePath);
    };

    const fileExtension = fileName.split('.').pop();

    return (
        <Wrapper>
            <CheckCell>
                <Checkbox value={fileHash} onCheck={onCheck} />
            </CheckCell>
            <IconCell onClick={preview}>
                <ExtIcon color="#F76F5D" text={(fileType || fileExtension) as string} />
            </IconCell>
            <MetaCell onClick={preview}>
                <MetaTitle title={fileName}>{name}</MetaTitle>
                {progress ? (
                    <Progress value={progress} />
                ) : (
                    <Published>
                        <FormattedDate
                            value={moment.unix(creation as number).toISOString()}
                            month="long"
                            day="2-digit"
                            hour="numeric"
                            minute="numeric"
                        />
                    </Published>
                )}
            </MetaCell>
            <SizeCell>
                <SizeCellDefault>
                    <FormattedMessage id="file_size_mb" defaultMessage="{size} МБ" values={{ size }} />
                </SizeCellDefault>
                <SizeCellHover>
                    <Button size="small" hollow onClick={preview}>
                        <FormattedMessage id="open" defaultMessage="Открыть" />
                    </Button>
                </SizeCellHover>
            </SizeCell>
            <DownloadCell>
                <Tooltip
                    size="small"
                    label={
                        formatMessage({ id: 'download', defaultMessage: 'Загрузка' })
                    }
                >
                    <Button size="small" hollow icon="Download" onClick={() => window.open(filePath as string)} />
                </Tooltip>
            </DownloadCell>
            <DeleteCell>
                <Tooltip
                    size="small"
                    label={
                        formatMessage({ id: 'delete', defaultMessage: 'Удалить' })
                    }
                >
                    <Button hollow size="small" icon="Delete" onClick={drop} />
                </Tooltip>
            </DeleteCell>
        </Wrapper>
    );
};

export default Item;
