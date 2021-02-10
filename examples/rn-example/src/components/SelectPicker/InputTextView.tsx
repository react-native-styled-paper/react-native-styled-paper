import * as React from 'react';
import styled from "styled-components/native";
import { variant } from 'styled-system';
import { Text, Wrapper, Row, CaptionText } from '..';
import { testProp } from '../../utils/UITestingHelper';
import { customStyled } from '../../utils/StyledUtils';

const Box = customStyled(
    Row,
    {
        width: 1,
        height: 50,
        border: '1px solid',
        borderColor: 'greyLight',
        borderRadius: 4,
        paddingX: 16,
        paddingY: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    variant({
        variants: {
            "error": {
                borderColor: 'tertiaryOrange',
            },
        },
    })
);

const IconBox = customStyled(Wrapper, {
    position: 'absolute',
    display: 'flex',
    right: 21,
    alignItems: 'center',
});

const truncatedStyle = {
    paddingRight: '20px',
    numberOfLines: 1,
    ellipsizeMode: 'tail',
};

const PlaceHolderText = customStyled(Text, {
    color: 'greyDark',
    opacity: 0.5,
    lineHeight: '20px',
    fontWeight: 400,
    ...truncatedStyle,
});

const ValueText = customStyled(Text, {
    color: 'darkBlack',
    fontWeight: 400,
    lineHeight: '20px',
    paddingTop: 1,
});

const LabelText = customStyled(CaptionText, {
    opacity: 0.5,
    ...truncatedStyle,
});

const Icon = () => (
    <IconBox>
        <Ionicons name="ios-chevron-down" color={theme.colors.greyDark} size={20} />
    </IconBox>
);

type Props = {
    selectedItem?: Record<string, unknown>,
    touchableWrapperProps?: Record<string, unknown>,
    boxProps?: Record<string, unknown>,
    showPicker?: boolean,
    placeholder?: string,
    variant?: string,
    renderLabel?: (props?) => React.ReactNode,
    renderValue?: (props?) => React.ReactNode,
    renderItemValue?: (props?) => React.ReactNode,
};

const InputTextView = ({
    selectedItem: propSelectedItem = {},
    placeholder,
    variant = "default",
    boxProps,
    showPicker,
    renderLabel,
    renderValue,
    renderItemValue,
}: Props) => {
    const selectedItem = propSelectedItem || {};

    return (
        <Box
            {...boxProps}
            variant={variant}
            borderColor={showPicker ? 'secondary' : 'greyLight'}
            paddingY={selectedItem.value ? '6px' : 14}
        >
            {selectedItem.value ? (
                <Wrapper width={1}>
                    <LabelText {...testProp('label')}>
                        {renderLabel ? renderLabel(selectedItem) : placeholder}
                    </LabelText>
                    {renderItemValue ? (
                        renderItemValue(selectedItem)
                    ) : (
                            <ValueText {...testProp('value')}>
                                {renderValue ? renderValue(selectedItem) : selectedItem.label}
                            </ValueText>
                        )}
                </Wrapper>
            ) : (
                    <Wrapper width={1}>
                        <PlaceHolderText {...testProp('placeholder')}>
                            {placeholder}
                        </PlaceHolderText>
                    </Wrapper>
                )}
            <Icon />
        </Box>
    );
};

export default InputTextView;
