const s3 = require('s3');
const path = require('path');
//const build = require('./build');
const task = require('./task');
import secret from './secret';
//const config = require('./config');

module.exports = task('upload', () => Promise.resolve()
  .then(() => Uploader)
);
const Uploader = new Promise((resolve, reject) => {
  const client = s3.createClient({
  s3Options: {
      accessKeyId: secret.aws_s3.accessKeyId,
      secretAccessKey: secret.aws_s3.secretAccessKey,
      region: 'ap-southeast-1',
      sslEnabled: true,
    },
  });
  const uploader = client.uploadDir({
    localDir: 'public/',
    deleteRemoved: true,
    s3Params: {
      Bucket: 'shoppylife.ml'
    },
  });
  uploader.on('error', reject);
  uploader.on('end', resolve);
});