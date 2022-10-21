import metaversefile from 'metaversefile';
const {useApp, useExporter} = metaversefile;

export default () => {
  const app = useApp();

  app.name = 'avatar-optimizer';

  useExporter(({mimeType, args}) => {
    console.log('got mime type', JSON.stringify(mimeType), JSON.stringify(args));

    if (mimeType === 'application/octet-stream') {
      return new Response('test');
    } else {
      return new Response('Not Found', {status: 404});
    }
  });

  return app;
};