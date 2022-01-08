const path = require("path");
const glob = require("glob");
const esbuild = require("esbuild");

const rootFolder = path.dirname(__dirname);
const resolvePath = (relativePath) => path.resolve(rootFolder, relativePath);

glob(resolvePath("src/**/*.ts"), function (_, entryPoints) {
  esbuild.buildSync({
    entryPoints,
    entryNames: "[dir]/[name]",
    outbase: resolvePath("src"),
    bundle: false,
    format: "cjs",
    tsconfig: resolvePath("tsconfig.json"),
    outdir: resolvePath("dist"),
  });
});
