import React from 'react';
import styled from "styled-components/native";

import Button from '../../Button/Button';

const RightArrowView = styled.View`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    justifycontent: center;
    z-index: 1;
`;

const RightArrowButton = styled(Button)`
    background-color: transparent;
`;

type Props = {
    title: string,
    CenterComponent: React.ReactNode,
    onPress: () => void,
}

class RightArrow extends React.Component<Props> {

    static defaultProps = {
        title: 'Right',
    };

    render() {
        const { CenterComponent, onPress } = this.props;

        const comps = CenterComponent ? (
            CenterComponent
        ) : (
                <RightArrowButton
                    onPress={onPress}
                >
                    Right
                </RightArrowButton>
            );

        return (
            <RightArrowView pointerEvents="box-none">
                {comps}
            </RightArrowView>
        );
    }
}

export default RightArrow;
