import React from "react";

export const ColorModeContext = React.createContext({
    mode: "",
    setMode: () => { console.error("Configure setMode!") },
    toggleMode: () => { console.error("Configure toggleMode!") }
});

export default function ColorModeProvider({children, initialMode}) {
    const [mode, setMode] = React.useState(initialMode)

    function toggleMode() {
        if (mode === "dark") setMode("light")
        else setMode("dark")
    }

    return (
        <ColorModeContext.Provider value={{ mode, setMode, toggleMode }}>
            {children}
        </ColorModeContext.Provider>
    );
}