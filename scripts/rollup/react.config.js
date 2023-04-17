import { getPkgJson, getBaseRollupPlugins } from './utils';
import generatePackageJson from 'rollup-plugin-generate-package-json';
// 获取react包
const { devPath, filePath, distPath } = getPkgJson('react');

export default [
  // react
  {
    input: filePath,
    output: {
      file: `${distPath}/index.js`,
      name: 'React',
      format: 'umd',
    },
    plugins: [
      ...getBaseRollupPlugins(),
      generatePackageJson({
        inputFolder: devPath,
        outputFolder: distPath,
        baseContents: ({ name, description, version }) => ({
          name,
          description,
          version,
          main: 'index.js',
        }),
      }),
    ],
  },
  // jsx-runtime
  {
    input: `${devPath}/src/jsx.ts`,
    output: [
      {
        file: `${distPath}/jsx-runtime.js`,
        name: 'jsx-runtime',
        format: 'umd',
      },
      {
        file: `${distPath}/jsx-dev-runtime.js`,
        name: 'jsx-dev-runtime',
        format: 'umd',
      },
    ],
    plugins: [...getBaseRollupPlugins()],
  },
];
