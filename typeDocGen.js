const TypeDoc = require("typedoc");
const path = require('path');

async function typeDocGen(entryPoint, tsconfigLocation) {
  const app = new TypeDoc.Application();

  // If you want TypeDoc to load tsconfig.json / typedoc.json files
  app.options.addReader(new TypeDoc.TSConfigReader());
  app.options.addReader(new TypeDoc.TypeDocReader());

  app.bootstrap({
      // typedoc options here
      entryPointStrategy: 'expand',
      entryPoints: [entryPoint],
      tsconfig: tsconfigLocation
  });

  const project = app.convert();

  if (project) {
      // Project may not have converted correctly
      const outputDir = "docs";

      // Rendered docs
      await app.generateDocs(project, outputDir);
      // Alternatively generate JSON output
      // await app.generateJson(project, outputDir + "/documentation.json");
  }
}

const extensionBase = require.resolve('@patternfly/react-catalog-view-extension').replace('dist/js/index.js', '')
const entry = path.relative(process.cwd(), path.join(extensionBase, 'src'))
const configLocation = path.relative(process.cwd(), path.join(extensionBase, 'tsconfig.json'))
// const foo = path.relative(process.cwd(), bar)
// console.log(entry)

typeDocGen(entry, configLocation).catch(console.error);

