import * as React from 'react';
import { storiesOf } from '@storybook/react-native';
import {
    Caption,
    Headline,
    Paragraph,
    Subheading,
    Text,
    Title,
} from 'react-native-styled-paper/components/Typography';

storiesOf('Text', module).add('Default', () => {

    return (
        <>
            <Caption>
                Caption
            </Caption>
            <Headline>
                Headline
            </Headline>
            <Paragraph>
                Paragraph
            </Paragraph>
            <Subheading>
                Subheading
            </Subheading>
            <Text>
                Text
            </Text>
            <Title>
                Title
            </Title>
        </>
    )
});

export {
    Caption,
    Headline,
    Paragraph,
    Subheading,
    Text,
    Title,
}
