import React from 'react';
import Svg, { Circle } from 'react-native-svg';

type Props = {
    count: number;
    size?: number;
    spacing?: number;
}

const SvgCircle = ({
    count, 
    size = 10, 
    spacing = 3
}: Props) => {
    const r = size / 2;
    const step = size + spacing;
    const width = step * (count - 1) + size;
    const height = size;

    return (
        <Svg height={height} width={width}>
            {Array.from({ length: count }).map((_, i) => (
                <Circle 
                    key={`circle-${i}`}
                    cx={r + i * step}
                    cy={r} 
                    r={r}
                    fill="#D37676" />
            ))}
        </Svg>
    )
}

export default SvgCircle;