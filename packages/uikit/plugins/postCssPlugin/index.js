const fs = require("fs");
const path = require("path");
const postcss = require("postcss");
const cssnano = require("cssnano");
// const postcssPresetEnv = require("postcss-preset-env");
const postcssModules = require("postcss-modules");
const { ClassnameBuilder } = require("@rtd/uikit-core");

const rootFolder = path.dirname(process.cwd());
const resolvePath = (relativePath) => path.resolve(rootFolder, relativePath);

const postCssPlugin = (options) => {
  const cssExportMap = {};
  const scopeNames = {};
  const cssCache = {};

  const cssmodules = postcssModules({
    scopeBehavior: "local",
    generateScopedName: (name, filename) => {
      const dir = path.relative(__dirname, filename);
      const hash = `${dir}:${name}`;

      if (scopeNames[hash]) {
        return scopeNames[hash];
      }
      scopeNames[hash] = ClassnameBuilder.getMinifiedClassname(hash);
      return scopeNames[hash];
    },
    getJSON: (filePath, exportTokens) => {
      Object.entries(exportTokens).forEach(([className, value]) => {
        if (value.includes("undefined")) {
          throw new Error(
            `${filePath} / .${className} composes from an incorrect classname`
          );
        }
      });
      cssExportMap[filePath] = exportTokens;
    },
  });

  return {
    name: "postCssPlugin",
    setup(build) {
      // Load paths tagged with the "env-ns" namespace and behave as if
      // they point to a JSON file containing the environment variables.
      build.onLoad({ filter: /.atomic.css$/ }, async (args) => {
        const css = await fs.promises.readFile(args.path);

        const result = await postcss([cssmodules]).process(css, {
          from: args.path,
          to: args.path,
        });
        cssCache[args.path] = result.css;
        const js = `
          export default ${JSON.stringify(cssExportMap[args.path])};
        `;
        return {
          contents: js,
        };
      });
      build.onEnd((result) => {
        console.log(`build ended with ${result.errors.length} errors`);
        const options = {
          preset: ["default", { calc: false }],
        };
        postcss(cssnano(options))
          .process(Object.values(cssCache).join(""), { from: undefined })
          .then((result) => {
            const filename = resolvePath("uikit/dist/rtd-uikit.css");
            fs.writeFileSync(filename, result.css);
          });
      });
    },
  };
};

module.exports = postCssPlugin;
