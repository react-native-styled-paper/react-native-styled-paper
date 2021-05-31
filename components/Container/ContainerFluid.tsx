import styled from "styled-components/native";
import { position, PositionProps, layout, LayoutProps, flexbox, FlexboxProps } from "styled-system";

const Container = styled.View<PositionProps & LayoutProps & FlexboxProps>`
    ${position}
    ${layout}
    ${flexbox}
`;

Container.defaultProps = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    width: "100%",
};

export default Container;
