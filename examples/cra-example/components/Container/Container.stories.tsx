import * as React from "react";
import { View, Text } from "react-native";
import { storiesOf } from "@storybook/react";
import { Row2 as Row, Column as Col } from "react-native-styled-paper/components/Container";

storiesOf("Container", module)
    .add("Default", () => {
        return (
            <View>
                <Row size={12}>
                    <Col sm={6} md={4} lg={3}>
                        <Text>
                            First Column
                        </Text>
                    </Col>
                    <Col sm={6} md={4} lg={3}>
                        <Text>
                            Second Column
                        </Text>
                    </Col>
                    <Col sm={6} md={4} lg={3}>
                        <Text>
                            First Column
                        </Text>
                    </Col>
                    <Col sm={6} md={4} lg={3}>
                        <Text>
                            Second Column
                        </Text>
                    </Col>
                    <Col sm={6} md={4} lg={3}>
                        <Text>
                            First Column
                        </Text>
                    </Col>
                    <Col sm={6} md={4} lg={3}>
                        <Text>
                            Second Column
                        </Text>
                    </Col>
                </Row>
                <Row size={12}>
                    <Col sm={6} md={4} lg={3}>
                        <Text>
                            First Column
                        </Text>
                    </Col>
                    <Col sm={6} md={4} lg={3}>
                        <Text>
                            Second Column
                        </Text>
                    </Col>
                    <Col sm={6} md={4} lg={3}>
                        <Text>
                            First Column
                        </Text>
                    </Col>
                    <Col sm={6} md={4} lg={3}>
                        <Text>
                            Second Column
                        </Text>
                    </Col>
                    <Col sm={6} md={4} lg={3}>
                        <Text>
                            First Column
                        </Text>
                    </Col>
                    <Col sm={6} md={4} lg={3}>
                        <Text>
                            Second Column
                        </Text>
                    </Col>
                </Row>
            </View>
        )
    })
