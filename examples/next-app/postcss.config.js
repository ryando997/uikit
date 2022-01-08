module.exports = {
  plugins: [
    [
      "@fullhuman/postcss-purgecss",
      {
        content: [
          "./pages/*.tsx"
        ]
      },
    ],
  ],
};
