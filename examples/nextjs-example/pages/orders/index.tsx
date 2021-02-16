import * as React from "react";
import { ScrollView } from "react-native"
import { Button, Text } from "react-native-styled-paper";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { OrderCard } from "components/OrderCard/OrderCard";

export default function OrderListPage(props) {

    const router = useRouter();
    const orders = useSelector(({ orderListReducer }) => orderListReducer.orders);

    return (
        <>
            <ScrollView>
                <Text>Order List Page</Text>
                <Button
                    onPress={() => {
                        router.back();
                    }}
                >
                    Go Back
                </Button>
                {(Array.isArray(orders) && orders.length > 0) &&
                    orders
                    .map((order, index) => {
                        return (
                            <OrderCard
                                key={index}
                            />
                        )
                    })
                }
            </ScrollView>
        </>
    )
}
