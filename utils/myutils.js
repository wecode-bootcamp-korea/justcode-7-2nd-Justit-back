const { yellow, red, blue, green } = require('cli-color');

const asyncWrap = asyncController => {
  return async (req, res, next) => {
    try {
      await asyncController(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

const checkDataIsNotEmpty = targetData => {
  Object.keys(targetData).forEach(key => {
    if (!targetData[key]) throw { status: 400, message: `plz fill ${key}` };
  });
};

const bodyText = req => {
  let bodyText = '';
  if (req.method !== 'GET') {
    bodyText = `${yellow('BODY\t|')}`;
    bodyText +=
      Object.keys(req.body)
        .map((key, index) => {
          return `${index === 0 ? '' : '\t' + yellow('|')} ${green.italic(
            key
          )} ${req.body[key]}`;
        })
        .join('\n') + '\n';
  }
  return bodyText;
};

const morganCustomFormat = (tokens, req, res) => {
  return [
    `\n= ${red('MESSAGE')} =`,
    '\n',
    `${blue('URL\t| ')}`,
    tokens.url(req, res),
    '\n',
    `${blue('METHOD\t| ')}`,
    tokens.method(req, res),
    '\n',
    bodyText(req),
    `${blue('STATUS\t| ')}`,
    tokens.status(req, res),
    '\n',
    `${blue('RESP\t| ')}`,
    tokens['response-time'](req, res),
    'ms',
    `${blue('\nDATE\t|')} `,
    new Date().toLocaleTimeString(),
    '\n',
  ].join('');
};

module.exports = {
  asyncWrap,
  checkDataIsNotEmpty,
  morganCustomFormat,
};
