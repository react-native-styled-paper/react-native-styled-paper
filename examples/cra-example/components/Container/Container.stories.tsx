import * as React from "react";
import { View, Text } from "react-native";
import { storiesOf } from "@storybook/react";
import Container, { Row, Column, ContainerFluid } from "react-native-styled-paper/components/Container";

storiesOf("Container", module)
    .add("Default", () => {
        return (
            <View
                style={{ display: "flex" }}
            >
                <Container
                    style={{ alignSelf: "center" }}
                >
                    <Text>Hello</Text>
                </Container>
                <ContainerFluid
                    style={{ alignSelf: "center" }}
                >
                    <Text>Hello</Text>
                </ContainerFluid>
                <Row size={12}>
                    <Column sm={6} md={4} lg={3}>
                        <Text>
                            First Column
                        </Text>
                    </Column>
                    <Column sm={6} md={4} lg={3}>
                        <Text>
                            Second Column
                        </Text>
                    </Column>
                    <Column sm={6} md={4} lg={3}>
                        <Text>
                            First Column
                        </Text>
                    </Column>
                    <Column sm={6} md={4} lg={3}>
                        <Text>
                            Second Column
                        </Text>
                    </Column>
                    <Column sm={6} md={4} lg={3}>
                        <Text>
                            First Column
                        </Text>
                    </Column>
                    <Column sm={6} md={4} lg={3}>
                        <Text>
                            Second Column
                        </Text>
                    </Column>
                </Row>
                <Row size={12}>
                    <Column sm={6} md={4} lg={3}>
                        <Text>
                            First Column
                        </Text>
                    </Column>
                    <Column sm={6} md={4} lg={3}>
                        <Text>
                            Second Column
                        </Text>
                    </Column>
                    <Column sm={6} md={4} lg={3}>
                        <Text>
                            First Column
                        </Text>
                    </Column>
                    <Column sm={6} md={4} lg={3}>
                        <Text>
                            Second Column
                        </Text>
                    </Column>
                    <Column sm={6} md={4} lg={3}>
                        <Text>
                            First Column
                        </Text>
                    </Column>
                    <Column sm={6} md={4} lg={3}>
                        <Text>
                            Second Column
                        </Text>
                    </Column>
                </Row>
            </View>
        )
    })
