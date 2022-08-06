import { createDarkTheme, createLightTheme } from 'baseui';

const primitives = {
  accent: '#F0725D',
  primaryFontFamily: 'Inter, sans-serif',
};

const darkPrimitives = {
  accent: '#F0725D',
  primaryFontFamily: 'Inter, sans-serif',
};

const lightOverrides = {
  breakpoints: {
    small: 460,
    medium: 769,
    large: 1024,
  },
  mediaQuery: {
    small: '@media screen and (min-width: 460px)',
    medium: '@media screen and (min-width: 769px)',
    large: '@media screen and (min-width: 1024px)',
  },

  colors: {
    backgroundLightAccent: '#e0faff',
    backgroundSecondary: '#e8e9eb',
    backgroundTertiary: '#f6f6f7',
    buttonSecondaryFill: '#eeeef1',
    inputFill: '#eeeef1',
    contentPrimary: '#2e3535',
    contentSecondary: '#445353',
    contentTertiary: '#637777',
    contentAccent: '#F0725D',
    backgroundAccent: '#2ebabd',
    buttonTertiaryHover: '#f4f4f7',
    buttonSecondaryText: '#2e3535',
    buttonSecondaryHover: '#e2e2e5',
    buttonPrimaryFill: primitives.accent,
    buttonPrimaryHover: '#2ebabd',
    tickFillSelected: primitives.accent,
    tagPositiveLightBackground: '#e1f3eb',
    tagAccentLightFont: '#1da7a7',
    positive: '#08c07c',
    negative: '#ff5e5e',
    borderSelected: primitives.accent,
    toastPositiveBackground: '#08c07c',
    tableHeadBackgroundColor: '#f6f6f7',
    tableBackground: '#ffffff',
    tableStripedBackground: '#f6f6f7',
  },
  lighting: {
    shadow400: 'rgb(0 0 0 / 7%) 0px 1px 4px',
  },
  typography: {
    HeadingXLarge: {
      fontWeight: '700',
    },
  },
};

const darkOverrides = {
  breakpoints: {
    small: 460,
    medium: 769,
    large: 1024,
  },
  mediaQuery: {
    small: '@media screen and (min-width: 460px)',
    medium: '@media screen and (min-width: 769px)',
    large: '@media screen and (min-width: 1024px)',
  },

  colors: {
    contentAccent: '#F0725D',
    backgroundLightAccent: '#dafbf4',
    backgroundPrimary: '#021e3e',
    backgroundSecondary: 'rgb(51 98 171 / 24%)',
    backgroundTertiary: '#18448f',
    backgroundAccent: '#1A856D',
    buttonPrimaryHover: '#1A856D',
    inputFill: '#1c489c',
    inputBorder: '#1c489c',
    inputFillActive: '#09274b',
    inputPlaceholder: '#cbcbcb',
    buttonSecondaryActive: '#09274b',
    buttonSecondaryHover: '#09274b',
    borderSelected: primitives.accent,
    tableHeadBackgroundColor: '#18448f',
    tableBackground: '#103a87',
    tableStripedBackground: '#276EF1',
  },
  lighting: {
    shadow400: 'rgb(0 0 0 / 7%) 0px 1px 4px',
  },
  typography: {
    HeadingXLarge: {
      fontWeight: '700',
    },
  },
};

export const lightTheme = createLightTheme(primitives, lightOverrides);
export const darkTheme = createDarkTheme(darkPrimitives, darkOverrides);
