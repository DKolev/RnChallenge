import { STRINGS } from './strings';

export const PIN_STYLE_IDS = {
  DEFAULT: 'default',
  CIRCLE: 'circle',
  STAR: 'star',
} as const;

export type PinStyleId = (typeof PIN_STYLE_IDS)[keyof typeof PIN_STYLE_IDS];

export const DEFAULT_PIN_STYLE = PIN_STYLE_IDS.DEFAULT;

// FontAwesome6 icon names for each pin style
export const PIN_STYLE_ICONS: Record<PinStyleId, string> = {
  [PIN_STYLE_IDS.DEFAULT]: 'location-dot',
  [PIN_STYLE_IDS.CIRCLE]: 'circle-dot',
  [PIN_STYLE_IDS.STAR]: 'star',
};

// available pin style options for settings screen
export const PIN_STYLES = [
  {
    id: PIN_STYLE_IDS.DEFAULT,
    name: STRINGS.DEFAULT_PIN,
    icon: PIN_STYLE_ICONS[PIN_STYLE_IDS.DEFAULT],
    selected: false,
  },
  {
    id: PIN_STYLE_IDS.CIRCLE,
    name: STRINGS.CIRCLE_PIN,
    icon: PIN_STYLE_ICONS[PIN_STYLE_IDS.CIRCLE],
    selected: false,
  },
  {
    id: PIN_STYLE_IDS.STAR,
    name: STRINGS.STAR_PIN,
    icon: PIN_STYLE_ICONS[PIN_STYLE_IDS.STAR],
    selected: false,
  },
] as const;
