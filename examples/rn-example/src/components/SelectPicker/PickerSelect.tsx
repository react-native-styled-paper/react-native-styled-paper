import * as React from 'react';
import { TouchableOpacity, Keyboard } from 'react-native';
import { Wrapper } from '..';
import { testProp, toSnakeCase } from '../../utils/UITestingHelper';
import InputTextBox from './InputTextView';
import PickerItemsView from './PickerItemsView';
import PickerItemsModal from './PickerItemsModal';

type Props = {
    items?: any[],
    value?: string | number,
    touchableWrapperProps?: Record<string, unknown>,
    inputAccessoryProps?: Record<string, unknown>,
    boxProps?: Record<string, unknown>,
    placeholder?: string,
    variant?: string,
    onChange?: (value?) => void,
    renderLabel?: (props?) => React.ReactNode,
    renderValue?: (props?) => React.ReactNode,
    renderItemValue?: (props?) => React.ReactNode,
    showModalMobile?: boolean,
    modalMobileProps?: Record<string, unknown>,
};

const PickerSelect = ({
    items: propItems = [],
    value,
    onChange,
    placeholder,
    inputAccessoryProps,
    boxProps,
    variant,
    touchableWrapperProps,
    renderLabel,
    renderValue,
    renderItemValue,
    showModalMobile,
    modalMobileProps,
}) => {
    const items = showModalMobile
        ? [...propItems]
        : [
            {
                label: placeholder,
                value: null,
            },
            ...propItems,
        ];
    const defaultValue = showModalMobile ? {} : items[0];
    const [showPicker, setShowPicker] = React.useState(false);
    const [selectedItem, setSelectedItem] = React.useState(defaultValue);

    React.useEffect(() => {
        if (value) {
            setSelectedItem(items.find(item => value === item.value));
        } else if (selectedItem && selectedItem.value) {
            setSelectedItem(defaultValue);
        }
    }, [items, selectedItem, value, defaultValue]);

    const togglePicker = () => {
        Keyboard.dismiss();
        setShowPicker(!showPicker);
    };

    const onValueChange = (value, index) => {
        const item = items[index];
        setSelectedItem(item);
        item && onChange(item.value, item);
    };

    const onSelectItem = (value, index) => {
        togglePicker();
        onValueChange(value, index);
    };

    return (
        <Wrapper {...testProp(toSnakeCase(placeholder))}>
            <TouchableOpacity
                onPress={togglePicker}
                accessible={false}
                activeOpacity={1}
                {...touchableWrapperProps}
                {...testProp('text_box_view')}
            >
                <InputTextBox
                    selectedItem={selectedItem}
                    variant={variant}
                    boxProps={boxProps}
                    placeholder={placeholder}
                    showPicker={showPicker}
                    renderLabel={renderLabel}
                    renderValue={renderValue}
                    renderItemValue={renderItemValue}
                />
            </TouchableOpacity>
            {showModalMobile ? (
                <PickerItemsModal
                    testID="pickeritems_view"
                    placeholder={placeholder}
                    items={items}
                    onValueChange={onSelectItem}
                    selectedItem={selectedItem}
                    showPicker={showPicker}
                    onClose={togglePicker}
                    {...modalMobileProps}
                />
            ) : (
                    <PickerItemsView
                        testID="pickeritems_view"
                        placeholder={placeholder}
                        items={items}
                        inputAccessoryProps={inputAccessoryProps}
                        onValueChange={onValueChange}
                        selectedItem={selectedItem}
                        onDonePress={togglePicker}
                        showPicker={showPicker}
                    />
                )}
        </Wrapper>
    );
};

PickerSelect.defaultProps = {
    onChange: () => { },
};

export default PickerSelect;
