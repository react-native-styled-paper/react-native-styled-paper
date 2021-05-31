import styled from "styled-components/native";
import { layout, LayoutProps, flexbox, FlexboxProps } from "styled-system";

const Container = styled.View<LayoutProps & FlexboxProps>`
    ${layout}
    ${flexbox}
`;

Container.defaultProps = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    width: "992px",
    maxWidth: "100%",
};

export default Container;
