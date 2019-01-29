function getTimestamp() {
  const now = new Date().toISOString();
  const split = now.split('T');
  const date = split[0];
  const time = split[1].slice(0, -1)

  return `${date} ${time} (UTC)`
}

let logger = {};

const levels = ['error', 'warn', 'info', 'debug', 'trace', 'log'];

levels.forEach((level) => {
  logger[level] = (...args) => {
    if (process.env.AWS_XRAY_DEBUG_MODE) {
      /* eslint-disable no-console */
      console[level](`${getTimestamp()} [${level.toUpperCase()}]`, ...args);
      /* eslint-enable no-console */
    }
  };
});

const logging = {
  setLogger: function setLogger(logObj) {
    logger = logObj;
  },

  getLogger: function getLogger() {
    return logger;
  }
};

module.exports = logging;
