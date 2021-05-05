import * as React from "react";
import { Button } from "react-native-styled-paper/components/Button";
import { Text } from "react-native-styled-paper/components/Typography";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { OrderCard } from "widgets/OrderCard/OrderCard";
import Layout from "components/layout";

export default function OrderListPage(props) {

    const router = useRouter();
    const orders = useSelector(({ orderListReducer }) => orderListReducer.orders);

    return (
        <Layout>
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
                        );
                    })
            }
        </Layout>
    );
}
