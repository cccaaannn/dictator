import { Slot, component$, useSignal } from '@builder.io/qwik'
import { PaletteMode } from '@mui/material';
import { ThemeContext } from './theme-context';
import { useContextProvider } from '@builder.io/qwik';

export const ThemeProvider = component$(() => {
	const paletteMode = useSignal<PaletteMode>("light");
	useContextProvider(ThemeContext, paletteMode);
	return <Slot />
})
