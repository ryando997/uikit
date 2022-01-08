const esbuild = require("esbuild");
const postCssPlugin = require("../plugins/postCssPlugin");
const fs = require("fs");
const path = require("path");
const glob = require("fast-glob");

const rootFolder = path.dirname(__dirname);
const resolvePath = (relativePath) => path.resolve(rootFolder, relativePath);

esbuild.build({
  entryPoints: [resolvePath("src/r.tsx")],
  outdir: resolvePath("dist"),
  minify: true,
  minifyWhitespace: true,
  minifyIdentifiers: true,
  minifySyntax: true,
  loader: {
    ".tsx": "tsx",
  },
  tsconfig: resolvePath('tsconfig.json'),
  plugins: [],
});
