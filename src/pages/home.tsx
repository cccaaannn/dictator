import { component$, useComputed$, useSignal, useTask$, $ } from '@builder.io/qwik'
import { useSpeechRecognition } from '@/hooks/use-speech-recognition/useSpeechRecognition';
import { Alert, LocaleComboBox } from '@/integrations/react/mui';
import { DefaultLocale, Locale } from '@/types/locale';
import useTheme from '@/hooks/use-theme/useTheme';
import { TextContentCard } from '@/components/text-content-card/text-content-card';
import { ContentDisplayType } from '@/types/content-display-type';
import { SpeechRecognitionResult } from '@/hooks/use-speech-recognition/speech-recognition-result';
import { ControlButtons } from '@/components/control-buttons/control-buttons';
import SettingsUtils, { Settings } from '@/utils/settings-utils';

export const Home = component$(() => {

	const recognitionResultListHistory = useSignal<SpeechRecognitionResult[]>([]);

	const contentDisplayType = useSignal<ContentDisplayType>(ContentDisplayType.TEXT);

	const isSettingsLoaded = useSignal<boolean>(false);

	const { theme, paletteMode } = useTheme();

	const {
		toggle,
		recognitionResults,

		isReady,
		isAvailable,
		isRunning,
		isError,

		locale,
	} = useSpeechRecognition();

	const voiceRecognitionResultList = useComputed$(() => {
		return [...recognitionResultListHistory.value, ...recognitionResults.value]
	});

	const copyText = $(() => {
		navigator.clipboard.writeText(voiceRecognitionResultList.value.map(result => result.transcript).join(""));
	});

	const clearText = $(() => {
		recognitionResultListHistory.value = [];
	});

	useTask$(({ track }) => {
		track(() => isRunning.value);

		if (!isRunning.value) {
			recognitionResultListHistory.value = [...recognitionResultListHistory.value, ...recognitionResults.value];
			recognitionResults.value = [];
		}
	});

	useTask$(() => {
		const settings: Settings | null = SettingsUtils.loadSettings();
		if (settings) {
			contentDisplayType.value = settings.contentDisplayType;
			locale.value = settings.locale;
			paletteMode.value = settings.paletteMode;
		}
		isSettingsLoaded.value = true;
	});

	useTask$(({ track }) => {
		track(() => locale.value);
		track(() => contentDisplayType.value);
		track(() => paletteMode.value);
		track(() => isSettingsLoaded.value);

		if (!isSettingsLoaded.value) return;

		const settings: Settings = {
			locale: locale.value,
			contentDisplayType: contentDisplayType.value,
			paletteMode: paletteMode.value
		}

		SettingsUtils.saveSettings(settings);
	});

	if (!isReady.value) return <Alert severity="info">Loading...</Alert>

	if (!isAvailable.value) return <Alert severity="error">Speech Recognition is not available on this device</Alert>

	return (
		<>
			{isError.value && <Alert severity="warning">An error occurred</Alert>}

			<ControlButtons
				contentDisplayType={contentDisplayType}
				isRunning={isRunning}
				toggleRecognition={toggle}
				copyText={copyText}
				clearText={clearText}
			/>

			<TextContentCard
				contentDisplayType={contentDisplayType}
				voiceRecognitionResultList={voiceRecognitionResultList}
			/>

			<LocaleComboBox
				theme={theme.value}
				disabled={isRunning.value}
				value={locale.value}
				onChange$={(_, value) => {
					if (!value || typeof value === "string") {
						locale.value = DefaultLocale;
						return;
					}
					locale.value = value as Locale;
				}}
				sx={{ width: { sm: "250px", xs: "200px" } }}
			/>
		</>
	)
})
