import { Signal, createContextId } from "@builder.io/qwik";
import { PaletteMode } from "@mui/material";

export const ThemeContext = createContextId<Signal<PaletteMode>>('theme-context');
