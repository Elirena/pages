import React, { useCallback } from 'react';
import { Wrapper, Title, Description, Price, IconStyled, TextBlock } from './styled';
import { Checkbox } from '@crysp/kit';

interface Props {
    title: React.ReactNode;
    description?: React.ReactNode;
    price: React.ReactNode;
    src?: string | null;
}

const Item: React.FC<Props> = ({ title, description = null, price, src = null }) => {
    const onChangeType = useCallback(
        (value, isChecked) => () => {
            console.log(value);
        },
        [],
    );

    return (
        <Wrapper>
            <Checkbox value={1} onCheck={onChangeType} />
            {src && <IconStyled src={src} />}
            <TextBlock>
                <Title> {title}</Title>
                <Description> {description}</Description>
            </TextBlock>
            <Price> {price}</Price>
        </Wrapper>
    );
};

export default Item;
