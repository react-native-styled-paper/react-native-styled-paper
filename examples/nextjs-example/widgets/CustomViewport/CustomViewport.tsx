import styled from "styled-components";
import { space, SpaceProps } from "styled-system";
import { ScrollviewViewport } from "react-native-styled-paper/components/Container";

const CustomViewport = styled(ScrollviewViewport)<SpaceProps>(
    space,
);

CustomViewport.defaultProps = {
    paddingTop: "56px",
    paddingLeft: "240px",
};

export default CustomViewport;
