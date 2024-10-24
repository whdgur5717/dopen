import { defineConfig } from '@pandacss/dev';
import { createPreset } from '@park-ui/panda-preset';

export default defineConfig({
  preflight: true,
  presets: [
    '@pandacss/preset-base',
    createPreset({
      accentColor: 'pink',
      grayColor: 'sand',
    }),
  ],
  include: ['./src/**/*.{js,jsx,ts,tsx}'],
  exclude: [],
  globalCss: {
    html: {
      fontSize: '62.5%',
    },
    body: {
      fontFamily: 'pretendard',
    },
  },
  globalFontface: {
    'LINESeedKR-Bd': {
      src: 'url(https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_11-01@1.0/LINESeedKR-Bd.woff2) format(woff2)',
      fontWeight: 400,
      fontStyle: 'normal',
    },
    pretendard: {
      src: "url(https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff) format('woff')",
      fontWeight: 400,
      fontStyle: 'normal',
    },
  },
  theme: {
    extend: {
      semanticTokens: {
        colors: {
          main: {
            value: {
              base: '{colors.accent.a4}',
              _dark: '{colors.accent.a8}',
            },
          },
        },
      },
    },
  },
  jsxFramework: 'react', // or 'solid' or 'vue'
  outdir: 'styled-system',
  watch: true,
});
