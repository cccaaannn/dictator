import { Slot, component$ } from '@builder.io/qwik'
import { Container, Typography } from '@/integrations/react/mui';
import useTheme from '@/hooks/use-theme/useTheme';

export const HomeLayout = component$(() => {
	const { theme } = useTheme();
	return (
		<Container maxWidth="lg"
			sx={{
				py: 3,
				display: "flex",
				flexDirection: "column",
				gap: 2
			}}
		>
			<div>
				<Typography theme={theme.value} color="primary" typography="h3" textAlign="center">
					Dictator
				</Typography>
				<Typography theme={theme.value} color="text.primary" typography="body1" textAlign="center">
					A dictation app to rule them all
				</Typography>
			</div>

			<Slot />
		</Container>
	)
})
