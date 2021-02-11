import * as React from "react";
import { storiesOf } from "@storybook/react";
import * as List from "react-native-styled-paper/components/List";
import FolderIcon from "@mdi/svg/svg/folder.svg";

const ListExample = () => {
    const [expanded, setExpanded] = React.useState(true);

    const handlePress = () => setExpanded(!expanded);

    return (
        <List.Section title="Accordions">
            <List.Accordion
                title="Uncontrolled Accordion"
                left={props => <List.Icon {...props} icon={FolderIcon} />}>
                <List.Item title="First item" />
                <List.Item title="Second item" />
            </List.Accordion>

            <List.Accordion
                title="Controlled Accordion"
                left={props => <List.Icon {...props} icon={FolderIcon} />}
                expanded={expanded}
                onPress={handlePress}>
                <List.Item title="First item" />
                <List.Item title="Second item" />
            </List.Accordion>
        </List.Section>
    );
};

storiesOf("List", module)
    .add("Default", () => {
        return (
            <ListExample />
        )
    })
