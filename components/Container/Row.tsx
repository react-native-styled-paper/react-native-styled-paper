import styled from "styled-components/native";
import { layout, LayoutProps, flexbox, FlexboxProps } from "styled-system";

const Row = styled.View<LayoutProps & FlexboxProps>`
    ${layout}
    ${flexbox}
`;

Row.defaultProps = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
}

export default Row;
