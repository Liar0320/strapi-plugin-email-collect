module.exports = {
  branches: ["main"],
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        "preset": "angular",
        "releaseRules": [
          { "type": "docs", "release": "patch" },
          { "type": "refactor", "release": "patch" },
          { "type": "style", "release": "patch" },
          { "type": "ci", "release": "patch" },
          { "type": "chore", "release": "patch" }
        ]
      }
    ],
    [
      "@semantic-release/release-notes-generator",
      {
        "parserOpts": {
          "noteKeywords": ["BREAKING CHANGE", "BREAKING CHANGES", "BREAKING"]
        },
        "preset": "conventionalcommits",
        "presetConfig": {
          "types": [
            { "type": "breaking", "section": "❗ Breaking ❗",  "hidden": false},
            { "type": "feat", "section": "✨ Feature ✨", "hidden": false },
            { "type": "fix", "section": "🐛 Bugfix 🐛", "hidden": false },
            { "type": "chore", "section": "🐛 Chore 🐛", "hidden": false },
            { "type": "hotfix", "section": "🔥 Hotfix 🔥", "hidden": false },
          ]
        }
      }
    ],
    [
      "@semantic-release/changelog",
      {
        changelogFile: "CHANGELOG.md",
      },
    ],
    "@semantic-release/npm",
    "@semantic-release/github",
    [
      "@semantic-release/git",
      {
        assets: ["CHANGELOG.md", "package.json"],
      },
    ],
  ],
};