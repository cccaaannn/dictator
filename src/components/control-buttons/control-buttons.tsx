import { component$, Signal } from '@builder.io/qwik'
import { Box, IconButton } from '@/integrations/react/mui';
import { ContentDisplayType } from '@/types/content-display-type';
import useTheme from '@/hooks/use-theme/useTheme';

interface ControlButtonsProps {
    isRunning: Signal<boolean>;
    contentDisplayType: Signal<ContentDisplayType>;
    toggleRecognition: () => void;
    copyText: () => void;
    clearText: () => void;
}

export const ControlButtons = component$((props: ControlButtonsProps) => {

    const { paletteMode, theme } = useTheme();

    return (
        <Box display="flex" justifyContent="space-between">
            <Box display="flex" gap={0.5}>
                <IconButton
                    theme={theme.value}
                    color={props.isRunning.value ? "error" : "secondary"}
                    onClick$={props.toggleRecognition}
                >
                    {
                        props.isRunning.value
                            ?
                            <span class="material-symbols-outlined">mic_off</span>
                            :
                            <span class="material-symbols-outlined">keyboard_voice</span>
                    }
                </IconButton>

                <IconButton
                    theme={theme.value}
                    onClick$={() => { props.contentDisplayType.value = (props.contentDisplayType.value + 1) % 2 }}
                >
                    {
                        props.contentDisplayType.value === ContentDisplayType.TEXT
                            ?
                            <span class="material-symbols-outlined">insert_chart</span>
                            :
                            <span class="material-symbols-outlined">notes</span>
                    }
                </IconButton>

                <IconButton
                    theme={theme.value}
                    onClick$={props.copyText}
                >
                    <span class="material-symbols-outlined">content_copy</span>
                </IconButton>

                <IconButton
                    theme={theme.value}
                    color='error'
                    disabled={props.isRunning.value}
                    onClick$={props.clearText}
                >
                    <span class="material-symbols-outlined">delete_forever</span>
                </IconButton>
            </Box>

            <IconButton
                theme={theme.value}
                onClick$={() => {
                    paletteMode.value === "light" ? paletteMode.value = "dark" : paletteMode.value = "light"
                }}
            >
                {
                    paletteMode.value === "light"
                        ?
                        <span class="material-symbols-outlined">light_mode</span>
                        :
                        <span class="material-symbols-outlined">dark_mode</span>
                }
            </IconButton>
        </Box>
    )
})
