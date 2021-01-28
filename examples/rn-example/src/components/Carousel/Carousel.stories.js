import React, { createRef } from 'react';
import { Image, Dimensions, View, StyleSheet } from "react-native";
import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { text, withKnobs } from '@storybook/addon-knobs';
import { Carousel, CarouselLeftArrow, CarouselRightArrow } from 'react-native-styled-paper';

const onPressFn = action("onPress");

storiesOf('Carousel', module)
    .addDecorator(withKnobs)
    .add('Default', () => {
        const _imageCarouselRef = createRef();

        const { width: viewportWidth } = Dimensions.get('window');
        const sliderWidth = viewportWidth - 32;

        // const title = text("title", "Text");
        return (
            <View
                style={{
                    ...StyleSheet.absoluteFillObject,
                }}
            >
                <CarouselLeftArrow
                    onPress={e => _imageCarouselRef.current.snapToPrev()}
                />
                <Carousel
                    sliderWidth={sliderWidth}
                    itemWidth={sliderWidth}
                    data={[{}, {}, {}]}
                    renderItem={({ item, index }) => {
                        return (
                            <Image
                                key={index}
                                source={{ uri: "https://via.placeholder.com/350x150" }}
                                style={{
                                    width: 250,
                                    height: 150,
                                }}
                            />
                        );
                    }}
                    ref={_imageCarouselRef}
                    loop={true}
                />
                <CarouselRightArrow
                    onPress={e => _imageCarouselRef.current.snapToNext()}
                />
            </View>
        )
    })
