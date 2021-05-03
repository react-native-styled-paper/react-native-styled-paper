import styled from "styled-components";
import { View } from "react-native";
import {
    SpaceProps,
    ColorProps,
    LayoutProps,
    PositionProps,
    border,
    borderColor,
    borderRadius,
    margin,
    width,
    height,
    boxShadow,
    flexbox,
    alignSelf,
    display,
    maxWidth,
    padding,
    textAlign,
    background,
    BackgroundProps,
    zIndex,
} from "styled-system";

const Wrapper = styled(View)<SpaceProps & LayoutProps & PositionProps & ColorProps & BackgroundProps>`
  ${width};
  ${height};
  ${maxWidth};
  ${borderRadius};
  ${margin};
  ${boxShadow};
  ${flexbox};
  ${display};
  ${padding};
  ${textAlign};
  ${border};
  ${borderColor};
  ${background};
  ${alignSelf};
  ${zIndex};
`;

Wrapper.defaultProps = {
    background: "white",
};

export default Wrapper;
