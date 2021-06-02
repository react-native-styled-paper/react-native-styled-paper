import styled from "styled-components/native";
import { position, PositionProps, layout, LayoutProps, flexbox, FlexboxProps, color, ColorProps } from "styled-system";

const Container = styled.View<PositionProps & LayoutProps & FlexboxProps & ColorProps>`
    ${position}
    ${layout}
    ${flexbox}
    ${color}
`;

Container.defaultProps = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    width: "100%",
    backgroundColor: "transparent",
};

export default Container;
