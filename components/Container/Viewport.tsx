import styled from "styled-components/native";
import { position, PositionProps, space, SpaceProps, compose } from "styled-system";

const Viewport = styled.View<PositionProps & SpaceProps>(compose(
    position,
    space,
));

Viewport.defaultProps = {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
};

export default Viewport;
