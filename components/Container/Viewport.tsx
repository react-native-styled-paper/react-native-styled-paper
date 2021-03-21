import styled from "styled-components/native";
import { position, PositionProps } from "styled-system";

const Viewport = styled.View<PositionProps>(
    position,
);

Viewport.defaultProps = {
    // position
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
};

export default Viewport;
