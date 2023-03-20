module.exports = {
  appenders: {
    output: {
      type: 'file',
      filename: 'webhook.log',
      maxLogSize: '1K', //  K, M, G
      backups: 3,
      compress: false,

      layout: {
        type: 'pattern',
        pattern: '[%d{yyyy-MM-dd hh:mm:ss}] [%p] %f{1} line-%l: %m',
      },
    },
  },
  // level: {
  //   ALL: new Level(Number.MIN_VALUE, "ALL"),
  //   TRACE: new Level(5000, "TRACE"),
  //   DEBUG: new Level(10000, "DEBUG"),
  //   INFO: new Level(20000, "INFO"),
  //   WARN: new Level(30000, "WARN"),
  //   ERROR: new Level(40000, "ERROR"),
  //   FATAL: new Level(50000, "FATAL"),
  //   MARK: new Level(9007199254740992, "MARK"), // 2^53
  //   OFF: new Level(Number.MAX_VALUE, "OFF")
  // },
  categories: {
    default: {
      appenders: ['output'],
      level: 'debug',
      enableCallStack: true,
    },
  },
};
