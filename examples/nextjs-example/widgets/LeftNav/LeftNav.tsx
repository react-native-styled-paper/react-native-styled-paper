import * as React from "react";
import { leftnavComponents } from "widgets/leftnavComponents";
import { Section, Accordion, Item, Icon } from "react-native-styled-paper/components/List";

const LeftNav = (props) => {

    const [ expandedId, setExpandedId ] = React.useState("");

    const handlePress = (accordionIndex) => {
        setExpandedId(expandedId === accordionIndex ? "" : accordionIndex);
    }

    const renderItem = (item, iIndex) => {
        return (
            <Item title="First item" key={iIndex}/>
        )
    }

    const renderAccordion = (accordion, aIndex, sIndex) => {

        const { icon, items } = accordion;
        const accordionIndex = `${sIndex}_${aIndex}`;

        return (
            <Accordion
                key={aIndex}
                title="Uncontrolled Accordion"
                left={props =>
                    <Icon {...props} icon={icon} />
                }
                expanded={expandedId === accordionIndex}
                onPress={() => handlePress(accordionIndex)}
            >
                {Array.isArray(items) && items.length > 0 &&
                    items
                        .map((item, iIndex) => renderItem(item, iIndex))
                }
            </Accordion>
        )
    }

    const renderSection = (section, sIndex) => {
        const { accordions } = section;

        return (
            <Section title="Accordions" key={sIndex}>
                {Array.isArray(accordions) && accordions.length > 0 &&
                    accordions
                        .map((accordion, aIndex) => renderAccordion(accordion, aIndex, sIndex))
                }
            </Section>
        )
    }

    return (
        <>
            {Array.isArray(leftnavComponents) && leftnavComponents.length > 0 &&
                leftnavComponents
                    .map((section, sIndex) => renderSection(section, sIndex))
            }
        </>
    )
}

export default LeftNav;
