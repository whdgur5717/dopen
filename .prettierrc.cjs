module.exports = {
  plugins: [require.resolve('@trivago/prettier-plugin-sort-imports')],
  importOrder: [
    '<THIRD_PARTY_MODULES>',

    '^~/app/(.*)$',
    '^~/pages/(.*)$',
    '^~/widgets/(.*)$',
    '^~/features/(.*)$',
    '^~/entities/(.*)$',
    '^~/shared/(.*)$',
    '^~/(.*)$',

    '^[./]',
    '^[../]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators'],
  singleQuote: true,
};