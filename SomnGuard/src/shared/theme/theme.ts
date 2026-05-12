// constants/theme.ts
export const Colors = {
  light: {
    background:    '#09111f',
    surface:       '#0c1b2e',
    input:         '#0e2236',
    inputFocused:  '#112840',
    border:        'rgba(0, 200, 200, 0.22)',
    borderFocused: '#00C8C8',
    accent:        '#00C8C8',
    accentLight:   'rgba(0, 200, 200, 0.12)',
    text:          '#d8eef6',
    textMuted:     '#5a8095',
    textLink:      '#00C8C8',
    error:         '#ff5555',
    errorBg:       'rgba(255, 80, 80, 0.08)',
    errorBorder:   'rgba(255, 80, 80, 0.25)',
    placeholder:   '#3a6070',
    tint:          '#00C8C8',
    icon:          '#5a8095',
    tabIconDefault:'#5a8095',
    tabIconSelected: '#00C8C8',
  },
  dark: {
    background:    '#09111f',
    surface:       '#0c1b2e',
    input:         '#0e2236',
    inputFocused:  '#112840',
    border:        'rgba(0, 200, 200, 0.22)',
    borderFocused: '#00C8C8',
    accent:        '#00C8C8',
    accentLight:   'rgba(0, 200, 200, 0.12)',
    text:          '#d8eef6',
    textMuted:     '#5a8095',
    textLink:      '#00C8C8',
    error:         '#ff5555',
    errorBg:       'rgba(255, 80, 80, 0.08)',
    errorBorder:   'rgba(255, 80, 80, 0.25)',
    placeholder:   '#3a6070',
    tint:          '#00C8C8',
    icon:          '#5a8095',
    tabIconDefault:'#5a8095',
    tabIconSelected: '#00C8C8',
  },
};

export const theme = {
  colors: Colors.light,
  spacing: {
    xs: 4,
    sm: 8,
    md: 14,
    lg: 20,
    xl: 28,
    xxl: 44,
  },
  radius: {
    input:  11,
    button: 13,
    card:   16,
    small:  8,
  },
  fontSize: {
    xs:  11,
    sm:  13,
    base: 15,
    md:  16,
    lg:  20,
    xl:  24,
    xxl: 28,
  },
};

export const Fonts = {
  rounded: 'System',
  mono: 'Courier New',
};

