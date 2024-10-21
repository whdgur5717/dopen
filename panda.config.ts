import { preset } from '@jongh/panda-preset';
import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  preflight: true,
  presets: ['@pandacss/preset-base', preset],
  include: ['./src/**/*.{js,jsx,ts,tsx}'],
  exclude: [],
  globalCss: {
    body: {
      fontFamily: 'LINESeedKR-Bd',
    },
  },
  globalFontface: {
    'LINESeedKR-Bd': {
      src: 'url(https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_11-01@1.0/LINESeedKR-Bd.woff2) format(woff2)',
      fontWeight: 400,
      fontStyle: 'normal',
    },
  },

  jsxFramework: 'react', // or 'solid' or 'vue'
  outdir: 'styled-system',
});
