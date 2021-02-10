import * as React from "react";
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from "src/types";

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Profile'>;

type Props = {
  route: ProfileScreenRouteProp;
};

export function ProfilePage(props: Props) {

    const {
        route,
    } = props;
    const {
        params,
    } = route;

    return (
        <div>
            Hello from ProfilePage {params.id}
        </div>
    )
}
