import { defineConfig } from '@pandacss/dev';

export default defineConfig({
  preflight: true,
  presets: ['@pandacss/preset-base', '@park-ui/panda-preset'],
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

  jsxFramework: 'react', // or 'solid' or 'vue'
  outdir: 'styled-system',
});
