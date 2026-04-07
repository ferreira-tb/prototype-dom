/** @type {import('typedoc').TypeDocOptions} */
export default {
  entryPoints: ['./src/index.ts'],
  out: 'docs',
  includeVersion: true,
  excludePrivate: true,
  excludeProtected: true,
  githubPages: false,
};
