import path from 'path';
import fs from 'fs';
import ts from 'rollup-plugin-typescript2';
import cjs from '@rollup/plugin-commonjs';
import { log } from 'console';

const pkgPath = path.resolve(__dirname, '../../packages');
const distPath = path.resolve(__dirname, '../../dist/node_modules');

function resolvePkgPath(pkgName) {
  return {
    // 开发包路径
    devPath: `${pkgPath}/${pkgName}`,
    // 生产包路径
    prodPath: `${distPath}/${pkgName}`,
  };
}

export function getPkgJson(pkgName) {
  const { devPath, prodPath } = resolvePkgPath(pkgName);

  const str = fs.readFileSync(`${devPath}/package.json`, { encoding: 'utf-8' });
  const packages_json = JSON.parse(str);

  return {
    filePath: `${devPath}/${packages_json.module}`,
    devPath,
    distPath: prodPath,
  };
}

export function getBaseRollupPlugins({ typescript = {} } = {}) {
  return [cjs(), ts(typescript)];
}
