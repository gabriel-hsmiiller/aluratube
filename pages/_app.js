import React from "react";
import { ThemeProvider } from "styled-components";
import { CSSReset } from '../src/components/css-reset';
import ColorModeProvider, { ColorModeContext } from "../src/components/Menu/components/color-mode";
import RegisterVideo from "../src/components/RegisterVideo";
import PlaylistProvider from "../src/components/RegisterVideo/components/playlist-provider";

const theme = {
    light: {
        backgroundBase: "#f9f9f9",
        backgroundLevel1: "#ffffff",
        backgroundLevel2: "#f0f0f0",
        borderBase: "#e5e5e5",
        textColorBase: "#222222"
    },
    dark: {
        backgroundBase: "#181818",
        backgroundLevel1: "#202020",
        backgroundLevel2: "#313131",
        borderBase: "#383838",
        textColorBase: "#ffffff"
    }
};

function ProviderWrapper(props) {
    return (
        <ColorModeProvider initialMode={"dark"}>
            <PlaylistProvider playlistInitialValue={{}} playlistIdInitialValue={{}}>
                {props.children}
            </PlaylistProvider>
        </ColorModeProvider>
    )
}

function Root({ Component, props}) {
    const colorModeContext = React.useContext(ColorModeContext);

    return (
        <ThemeProvider theme={theme[colorModeContext.mode]}>
            <CSSReset />
            <Component {...props} />
            <RegisterVideo />
        </ThemeProvider>
    )
}

export default function _App(props) {
    return (
        <ProviderWrapper>
            <Root {...props} />
        </ProviderWrapper>
    )
};