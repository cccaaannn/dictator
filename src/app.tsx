import { component$ } from '@builder.io/qwik';
import { Home } from '@/pages/home';
import { ThemeProvider } from '@/hooks/use-theme/theme-provider';
import { CssBaseline } from '@/integrations/react/mui';
import { HomeLayout } from '@/components/layout/home-layout';

export const App = component$(() => {
	return (
		<ThemeProvider>
			<CssBaseline />

			<HomeLayout>
				<Home />
			</HomeLayout>
		</ThemeProvider>
	)
})
