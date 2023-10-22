import { ThemeContext } from "@/hooks/use-theme/theme-context";
import { useSignal, useTask$, noSerialize } from "@builder.io/qwik";
import { PaletteMode, Theme, createTheme, responsiveFontSizes } from "@mui/material";
import { useContext } from '@builder.io/qwik';

const getTheme = (mode?: PaletteMode | undefined): Theme => {
	let theme = createTheme({
		palette: {
			mode: mode ?? "light",
			primary: {
				main: "#C2185B"
			},
			secondary: {
				main: "#00c414"
			},
			text: {
				primary: mode === "dark" ? "#fff" : "#212121"
			}
		},
		components: {
			MuiButton: {
				styleOverrides: {
					root: {
						textTransform: "none"
					}
				}
			}
		}
	});
	theme = responsiveFontSizes(theme);

	return theme;
}

const useTheme = () => {

	const paletteMode = useContext(ThemeContext);

	const theme = useSignal<Theme | undefined>(noSerialize(getTheme(paletteMode.value)));

	useTask$(({ track }) => {
		track(() => paletteMode.value);

		theme.value = noSerialize(getTheme(paletteMode.value));

		if (!theme.value) {
			return;
		}

		// Update background manually, since we can't use global styles
		document.documentElement.style.background = theme.value.palette.background.default;
	});

	return {
		paletteMode,
		theme,
	}
}

export default useTheme;
