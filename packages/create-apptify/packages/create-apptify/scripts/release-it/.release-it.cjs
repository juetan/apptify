const fs = require('fs');
const path = require('path');

const loadTemplate = (name) => {
  const template = fs.readFileSync(path.join(__dirname, `template-${name}.hbs`), 'utf8');
  return template;
};

module.exports = {
  git: {
    commitMessage: 'chore(release): v${version}',
  },
  npm: {
    publish: false,
  },
  github: {
    release: false,
  },
  gitlab: {
    release: false,
  },
  plugins: {
    '@release-it/conventional-changelog': {
      ignoreRecommendedBump: true,
      infile: 'CHANGELOG.md',
      header: '# 版本记录',
      preset: {
        name: 'conventionalcommits',
        types: [
          {
            type: 'feat',
            section: '✨功能新增',
          },
          {
            type: 'impr',
            section: '⚡️改进优化',
          },
          {
            type: 'fix',
            section: '🐛问题修复',
          },
        ],
      },
      context: {
        host: 'http://122.9.35.57:9080',
        owner: 'pa-pis/beihai-papis/frontend',
        repository: 'system-web',
      },
      gitRawCommitsOpts: {
        format:
          '%B%n-hash-%n%H%n-shortHash-%n%h%n-gitTags-%n%d%n-committerDate-%n%ci%n-author-%n%an%n-email-%n%ae%n-date-%n%ci',
      },
      writerOpts: {
        commitsSort: false,
        commitGroupsSort: (a, b) => {
          const order = ['✨功能新增', '⚡️改进优化', '🐛问题修复'];
          return order.indexOf(a.title) - order.indexOf(b.title);
        },
        commitPartial: loadTemplate('commit'),
        // headerPartial: loadTemplate('header'),
        mainTemplate: loadTemplate('template'),
      },
    },
  },
};
