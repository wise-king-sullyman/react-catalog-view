module.exports = {
  branches: [
    { name: 'refs/pull/4/merge', channel: 'prerelease' }
  ],
  analyzeCommits: {
    preset: 'angular'
  },
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'angular',
        releaseRules: [
          { type: 'chore', scope: 'CI-release', release: 'patch' },
          { type: 'chore', scope: 'CI-breaking', release: 'breaking' }
        ]
      }
    ],
    '@semantic-release/release-notes-generator',
    '@semantic-release/github',
    [
      '@semantic-release/npm',
      {
        npmPublish: false,
        pkgRoot: '../packages/module'
      }
    ]
  ],
  tagFormat: 'prerelease-v${version}',
  dryRun: true,
  ci: false
};
