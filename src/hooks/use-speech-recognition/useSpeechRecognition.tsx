import { DefaultLocale, Locale } from '@/types/locale';
import { SpeechRecognitionResult } from '@/hooks/use-speech-recognition/speech-recognition-result';
import { Signal, useSignal, useVisibleTask$, $ } from '@builder.io/qwik';

const initSpeechRecognition = (): SpeechRecognition | undefined => {
	window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

	if (!window.SpeechRecognition) {
		return undefined;
	}

	const recognition = new SpeechRecognition();
	recognition.maxAlternatives = 1;
	recognition.interimResults = true;
	recognition.continuous = true;
	recognition.lang = DefaultLocale.value;
	return recognition;
}

export interface UseSpeechRecognition {
	start: () => void;
	stop: () => void;
	toggle: () => void;
	recognitionResults: Signal<SpeechRecognitionResult[]>;
	isReady: Signal<boolean>;
	isAvailable: Signal<boolean>;
	isRunning: Signal<boolean>;
	isError: Signal<boolean>;
	locale: Signal<Locale>;
}

export function useSpeechRecognition(): UseSpeechRecognition {

	const recognitionResults = useSignal<SpeechRecognitionResult[]>([]);
	const isReady = useSignal<boolean>(false);
	const isAvailable = useSignal<boolean>(false);
	const isRunning = useSignal<boolean>(false);
	const isError = useSignal<boolean>(false);
	const locale = useSignal<Locale>(DefaultLocale);

	const _recognizer: Signal<SpeechRecognition | undefined> = useSignal(initSpeechRecognition());

	const start = $((): void => {
		if (!_recognizer.value) {
			console.error("[UseSpeechRecognition] SpeechRecognition not available");
			return;
		}

		_recognizer.value.start();
	});

	const stop = $((): void => {
		if (!_recognizer.value) {
			console.error("[UseSpeechRecognition] SpeechRecognition not available");
			return;
		}

		_recognizer.value.stop();
	});

	const toggle = $((): void => {
		isRunning.value ? stop() : start();
	});

	useVisibleTask$(({ track }) => {
		track(() => locale.value);

		if (!_recognizer.value) {
			console.error("[UseSpeechRecognition] SpeechRecognition not available");
			return;
		}

		_recognizer.value.lang = locale.value.value;
		console.debug(`[UseSpeechRecognition] Language changed to ${locale.value.value}`);
	});

	useVisibleTask$(({ track }) => {
		track(() => _recognizer.value)

		if (_recognizer.value) {
			console.info("[UseSpeechRecognition] SpeechRecognition initialized");
			isAvailable.value = true;
		}
		else {
			console.error("[UseSpeechRecognition] SpeechRecognition not available");
			isAvailable.value = false;
		}

		isReady.value = true;
	});

	useVisibleTask$(({ cleanup }) => {
		if (!_recognizer.value) {
			console.error("[UseSpeechRecognition] SpeechRecognition not available");
			return;
		}

		const onStart = () => { isRunning.value = true }

		const onEnd = () => { isRunning.value = false }

		const onError = () => { isError.value = true }

		const onResult = (e: SpeechRecognitionEvent) => {
			const transcript = Array.from(e.results)
				.map(result => result[0])
				.map(result => {
					return {
						transcript: result.transcript,
						confidence: result.confidence
					}
				});

			if (e.results[0].isFinal) {
				console.info("[SpeechRecognition]", transcript);
				recognitionResults.value = transcript;
			}
		}

		_recognizer.value.addEventListener('end', onEnd);
		_recognizer.value.addEventListener('start', onStart);
		_recognizer.value.addEventListener('error', onError);
		_recognizer.value.addEventListener('result', onResult);

		cleanup(() => {
			_recognizer.value?.removeEventListener('end', onEnd);
			_recognizer.value?.removeEventListener('start', onStart);
			_recognizer.value?.removeEventListener('error', onError);
			_recognizer.value?.removeEventListener('result', onResult);
		});
	}, { strategy: 'document-ready' });

	return {
		start,
		stop,
		toggle,
		recognitionResults,
		isReady,
		isAvailable,
		isRunning,
		isError,
		locale
	};
}