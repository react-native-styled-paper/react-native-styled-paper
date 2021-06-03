import * as React from "react";
import { storiesOf } from "@storybook/react";
import Image from "react-native-styled-paper/components/Image";

storiesOf("Image", module)
    .add("Default", () => {
        return (
            <>
                <Image
                    source={{ uri: "https://via.placeholder.com/350x150.png" }}
                    width={200}
                    height={200}
                />
            </>
        )
    })