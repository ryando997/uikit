const fs = require("fs");
const path = require("path");
const glob = require("glob");
const rimraf = require("rimraf");

const rootFolder = path.dirname(__dirname);
const resolvePath = (relativePath) => path.resolve(rootFolder, relativePath);

function createDistFolder() {
  const dir = resolvePath("dist");
  rimraf.sync(dir);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
}

glob(resolvePath("src/*.js"), function (_, entryPoints) {
  entryPoints.forEach(function (entry) {
    const { css, filename } = require(entry);
    try {
      createDistFolder();
      fs.writeFileSync(resolvePath(`dist/${filename}.css`), css);
      console.log(`Create successful file ${filename}.css`);
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  });
});
