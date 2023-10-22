import { Signal, component$ } from '@builder.io/qwik'
import { Box, TooltipChip, Typography } from '@/integrations/react/mui';
import useTheme from '@/hooks/use-theme/useTheme';
import { VoiceRecognitionResult } from '@/hooks/use-speech-recognition/voice-recognition-result';
import { ContentDisplayType } from '@/types/content-display-type';
import { green, red, cyan, amber, orange, grey } from '@mui/material/colors';

function getConfidenceColor(confidence: number | undefined) {
    if (!confidence) {
        return grey[500];
    }

    if (confidence >= 0.95) {
        return green[500];
    }
    if (confidence >= 0.85) {
        return cyan[500];
    }
    if (confidence >= 0.75) {
        return amber[500];
    }
    if (confidence >= 0.60) {
        return orange[500];
    }

    return red[500];
}

interface TextContentCardProps {
    voiceRecognitionResultList: Signal<VoiceRecognitionResult[]>;
    contentDisplayType: Signal<ContentDisplayType>;
}

export const TextContentCard = component$((props: TextContentCardProps) => {
    const { theme } = useTheme();
    return (
        <Box
            display="flex"
            justifyContent="start"
            alignItems="start"
            alignContent="start"
            border={`2px solid ${theme.value?.palette.primary.main}`}
            width="100%"
            minHeight={200}
            flexWrap="wrap"
            overflow="hidden"
            p={1}
            gap="1ch"
            borderRadius="10px"
        >
            {
                props.contentDisplayType.value === ContentDisplayType.TEXT
                    ?
                    <Typography theme={theme.value} color="text.primary" typography="p" sx={{ wordBreak: "break-all" }}>
                        {props.voiceRecognitionResultList.value.map(result => result.transcript).join("")}
                    </Typography>
                    :
                    props.voiceRecognitionResultList.value.map((result, index) => (
                        <TooltipChip
                            key={index}
                            theme={theme.value}
                            variant='filled'
                            TooltipProps={{
                                title: `%${result.confidence.toFixed(2)}`
                            }}
                            sx={{
                                bgcolor: getConfidenceColor(result.confidence)
                            }}
                        >
                            {
                                result.transcript
                                    ?
                                    result.transcript
                                    :
                                    "<N/A>"
                            }
                        </TooltipChip>
                    ))
            }
        </Box>
    )
})
