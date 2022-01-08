const { stylesheet, ruleset } = require("@rtd/uikit-core");

const PRELUDE = `/*
*/`;

const SPACING_PX = 4;
const SCALE_LENGTH = 12;
const SCALE = new Array(SCALE_LENGTH).fill().map((_, i) => i + 1);

const space = (n) => (n === 0 ? 0 : `${SPACING_PX * n}px`);

const capitalize = (str) =>
  `${str.substring(0, 1).toUpperCase()}${str.substring(1, str.length)}`;

const classname = (namespace, className) =>
  namespace ? `.${namespace}${capitalize(className)}` : `.${className}`;

const rules = (i, prefix) => [
  ruleset(classname(prefix, `m-${i}`), {
    margin: space(i),
  }),
  ruleset(classname(prefix, `-m-${i}`), {
    margin: space(-i),
  }),
  ruleset(classname(prefix, `mt-${i}`), {
    "margin-top": space(i),
  }),
  ruleset(classname(prefix, `-mt-${i}`), {
    "margin-top": space(-i),
  }),
  ruleset(classname(prefix, `mb-${i}`), {
    "margin-bottom": space(i),
  }),
  ruleset(classname(prefix, `-mb-${i}`), {
    "margin-bottom": space(-i),
  }),
  ruleset(classname(prefix, `my-${i}`), {
    "margin-bottom": space(i),
    "margin-top": space(i),
  }),
  ruleset(classname(prefix, `mx-${i}`), {
    "margin-left": space(i),
    "margin-right": space(i),
  }),
  ruleset(classname(prefix, `-my-${i}`), {
    "margin-bottom": space(-i),
    "margin-top": space(-i),
  }),
  ruleset(classname(prefix, `-mx-${i}`), {
    "margin-left": space(-i),
    "margin-right": space(-i),
  }),
  ruleset(classname(prefix, `p-${i}`), {
    padding: space(i),
  }),
  ruleset(classname(prefix, `-p-${i}`), {
    padding: space(-i),
  }),
  ruleset(classname(prefix, `pt-${i}`), {
    "padding-top": space(i),
  }),
  ruleset(classname(prefix, `-pt-${i}`), {
    "padding-top": space(-i),
  }),
  ruleset(classname(prefix, `pb-${i}`), {
    "padding-bottom": space(i),
  }),
  ruleset(classname(prefix, `-pb-${i}`), {
    "padding-bottom": space(-i),
  }),
  ruleset(classname(prefix, `py-${i}`), {
    "padding-bottom": space(i),
    "padding-top": space(i),
  }),
  ruleset(classname(prefix, `px-${i}`), {
    "padding-left": space(i),
    "padding-right": space(i),
  }),
  ruleset(classname(prefix, `-py-${i}`), {
    "padding-bottom": space(i),
    "padding-top": space(i),
  }),
  ruleset(classname(prefix, `-px-${i}`), {
    "padding-left": space(-i),
    "padding-right": space(-i),
  }),
];

const autoRules = (prefix) => [
  ruleset(classname(prefix, `ml-auto`), {
    "margin-left": "auto",
  }),
  ruleset(classname(prefix, `mr-auto`), {
    "margin-right": "auto",
  }),
  ruleset(classname(prefix, `mt-auto`), {
    "margin-top": "auto",
  }),
  ruleset(classname(prefix, `mb-auto`), {
    "margin-bottom": "auto",
  }),
];

module.exports.css = stylesheet(PRELUDE, [
  // Add margin/padding for auto + spacing -12 through 12 (keep non-@media first,
  // followed by sequential sm/md/lg @media rules to allow proper @media overriding)
  ...autoRules(),
  ...[0, ...SCALE].reduce((arr, i) => arr.concat(rules(i)), []),
]);
module.exports.filename = "spacing";
