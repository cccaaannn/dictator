/** @jsxImportSource react */

import { qwikify$ } from '@builder.io/qwik-react';
import {
    CssBaseline as MCssBaseline,
    Button as MButton,
    IconButton as MIconButton,
    Box as MBox,
    Container as MContainer,
    Typography as MTypography,
    Autocomplete as MAutocomplete,
    TextField as MTextField,
    Tooltip as MTooltip,
    Chip as MChip,
    Alert as MAlert,
    CircularProgress as MCircularProgress,
    AutocompleteProps,
    ThemeProvider,
    ButtonProps,
    BoxProps,
    TypographyProps,
    Theme,
    TooltipProps,
    ChipProps,
    IconButtonProps,
    AlertProps,
    CircularProgressProps,
} from '@mui/material';

import { LOCALES, Locale } from '@/types/locale';

interface ThemeableComponent {
    theme?: Theme;
}

interface LocaleComboBoxProps
    <
        Multiple extends boolean | undefined,
        DisableClearable extends boolean | undefined,
        FreeSolo extends boolean | undefined
    >
    extends Omit<AutocompleteProps<Locale, Multiple, DisableClearable, FreeSolo>, "renderInput" | "options">, ThemeableComponent { }

function MLocaleComboBox
    <
        Multiple extends boolean | undefined,
        DisableClearable extends boolean | undefined,
        FreeSolo extends boolean | undefined
    >
    ({ theme, ...props }: LocaleComboBoxProps<Multiple, DisableClearable, FreeSolo>) {
    const body = (
        <MAutocomplete
            {...props}
            options={LOCALES}
            groupBy={(option) => option.group}
            isOptionEqualToValue={(option: Locale, value: Locale) => option.value === value.value}
            getOptionLabel={(option: Locale | string) => {
                if (!option || typeof option === "string") {
                    return "";
                }
                return `${option.group} - ${option.label}`;
            }}
            renderInput={(params) => (
                <MTextField
                    {...params}
                    label={<span className="material-symbols-outlined">language_korean_latin</span>}
                />
            )}
        />
    )

    if (!theme) return body;
    return (
        <ThemeProvider theme={theme}>
            {body}
        </ThemeProvider>
    );
}

interface CustomButtonProps extends ButtonProps, ThemeableComponent { }
function CustomButton({ theme, ...props }: CustomButtonProps) {
    const body = (
        <MButton {...props} />
    )
    if (!theme) return body;
    return (
        <ThemeProvider theme={theme}>
            {body}
        </ThemeProvider>
    );
}

interface CustomIconButtonProps extends IconButtonProps, ThemeableComponent { }
function CustomIconButton({ theme, ...props }: CustomIconButtonProps) {
    const body = (
        <MIconButton {...props} />
    )
    if (!theme) return body;
    return (
        <ThemeProvider theme={theme}>
            {body}
        </ThemeProvider>
    );
}

interface CustomBoxProps extends BoxProps, ThemeableComponent { }
function CustomBox({ theme, ...props }: CustomBoxProps) {
    const body = (
        <MBox {...props}>
            {props.children}
        </MBox>
    )
    if (!theme) return body;
    return (
        <ThemeProvider theme={theme}>
            {body}
        </ThemeProvider>
    );
}

interface CustomAlertProps extends AlertProps, ThemeableComponent { }
function CustomAlert({ theme, ...props }: CustomAlertProps) {
    const body = (
        <MAlert {...props}>
            {props.children}
        </MAlert>
    )
    if (!theme) return body;
    return (
        <ThemeProvider theme={theme}>
            {body}
        </ThemeProvider>
    );
}

interface CustomCircularProgressProps extends CircularProgressProps, ThemeableComponent { }
function CustomCircularProgress({ theme, ...props }: CustomCircularProgressProps) {
    const body = (
        <MCircularProgress {...props} />
    )
    if (!theme) return body;
    return (
        <ThemeProvider theme={theme}>
            {body}
        </ThemeProvider>
    );
}

interface CustomTypographyProps extends TypographyProps, ThemeableComponent { }
function CustomTypography({ theme, ...props }: CustomTypographyProps) {
    const body = (
        <MTypography {...props}>
            {props.children}
        </MTypography>
    )
    if (!theme) return body;
    return (
        <ThemeProvider theme={theme}>
            {body}
        </ThemeProvider>
    );
}

interface CustomTooltipTypographyProps extends TypographyProps, ThemeableComponent {
    TooltipProps: Omit<TooltipProps, "children">;
}
function CustomTooltipTypography({ theme, TooltipProps, ...props }: CustomTooltipTypographyProps) {
    const body = (
        <MTooltip {...TooltipProps}>
            <MTypography {...props}>
                {props.children}
            </MTypography>
        </MTooltip>
    )
    if (!theme) return body;
    return (
        <ThemeProvider theme={theme}>
            {body}
        </ThemeProvider>
    );
}

interface CustomTooltipChipProps extends Omit<ChipProps, "children">, ThemeableComponent {
    TooltipProps: Omit<TooltipProps, "children">;
    TypographyProps?: TypographyProps;
    children?: React.ReactNode;
}
function CustomTooltipChip({ theme, TooltipProps, children, sx, ...props }: CustomTooltipChipProps) {
    const body = (
        <MTooltip {...TooltipProps}>
            <MChip
                {...props}
                sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    ...sx
                }}
                label={
                    <MTypography
                        sx={{
                            wordWrap: "break-word",
                            wordBreak: "break-all",
                            overflowWrap: 'break-word',
                            whiteSpace: 'normal',
                            textOverflow: 'clip'
                        }}
                    >
                        {children}
                    </MTypography>
                }
            />
        </MTooltip>
    )
    if (!theme) return body;
    return (
        <ThemeProvider theme={theme}>
            {body}
        </ThemeProvider>
    );
}


export const CssBaseline = qwikify$(MCssBaseline);
export const Box = qwikify$(CustomBox, { eagerness: 'hover' });
export const Container = qwikify$(MContainer, { eagerness: 'hover' });
export const Typography = qwikify$(CustomTypography, { eagerness: 'hover' });
export const TooltipTypography = qwikify$(CustomTooltipTypography, { eagerness: 'hover' });
export const TooltipChip = qwikify$(CustomTooltipChip, { eagerness: 'hover' });
export const Button = qwikify$(CustomButton, { eagerness: 'hover' });
export const IconButton = qwikify$(CustomIconButton, { eagerness: 'hover' });
export const Alert = qwikify$(CustomAlert, { eagerness: 'hover' });
export const CircularProgress = qwikify$(CustomCircularProgress, { eagerness: 'hover' });
export const TextField = qwikify$(MTextField, { eagerness: 'hover' });
export const LocaleComboBox = qwikify$(MLocaleComboBox, { eagerness: 'hover' });
