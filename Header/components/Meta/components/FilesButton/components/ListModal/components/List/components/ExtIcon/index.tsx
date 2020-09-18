import React from 'react';
import { Wrapper, Background, Text } from './styled';

interface Props {
    color: '#F76F5D' | '#00ADF2';
    text: string;
}

const ExtIcon: React.FC<Props> = ({ color, text }) => (
    <Wrapper>
        <Background>
            <svg width="100%" height="100%" viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M0 12V28C0 34.6274 5.37258 40 12 40H28C34.6274 40 40 34.6274 40 28V12L28.2353 0H12C5.37258 0 0 5.37258 0 12Z"
                    fill={color}
                />
                <path
                    opacity="0.5"
                    d="M28.3345 0L40.0011 11.6667H34.3345C31.0208 11.6667 28.3345 8.98038 28.3345 5.66667V0Z"
                    fill="white"
                />
            </svg>
        </Background>
        <Text>{text}</Text>
    </Wrapper>
);

export default ExtIcon;
