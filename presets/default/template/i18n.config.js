const sourcePattern = './i18n_messages/**/*.json';
const targetDir = './src/locales';

module.exports = {
  middlewares: {
    summary: [
      `summary?sourcePattern=${sourcePattern}`,
    ],
    process: [
      `fetchLocal?source=${targetDir},skip`,
      'metaToResult?from=defaultMessage,to=zh',
      'gugu?from[]=zh,to[]=en',
      'reduce?autoPick,autoReduce[]=local',
    ],
    emit: [
      `save?dest=${targetDir}`,
    ],
  },
};
