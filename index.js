import metaversefile from 'metaversefile';
const {useApp, useExport, useAvatarOptimizer} = metaversefile;

const _fetchArrayBuffer = async srcUrl => {
  const res = await fetch(srcUrl);
  if (res.ok) {
    const arrayBuffer = await res.arrayBuffer();
    return arrayBuffer;
  } else {
    throw new Error('failed to load: ' + res.status + ' ' + srcUrl);
  }
};

export default () => {
  const app = useApp();

  app.name = 'avatar-optimizer';

  useExport(async ({mimeType, args}) => {
    console.log('got mime type', JSON.stringify(mimeType), JSON.stringify(args));

    if (mimeType === 'application/octet-stream') {
      const {srcUrl, quality} = args;
      const arrayBuffer = await _fetchArrayBuffer(srcUrl);

      const avatarOptimizer = useAvatarOptimizer();
      const {
        createSpriteAvatarMesh,
        crunchAvatarModel,
        optimizeAvatarModel,
      } = avatarOptimizer;

      switch (quality) {
        /*case 1: {
          const {
            textureImages,
          } = await createSpriteAvatarMesh({arrayBuffer, srcUrl});
          const blob = new Blob([textureImages]);
          return blob;
        }*/
        case 2: {
          const {
            glbData
          } = await crunchAvatarModel({arrayBuffer, srcUrl});
          const blob = new Blob([glbData]);
          return blob;
        }
        case 3: {
          const {
            glbData
          } = await optimizeAvatarModel({arrayBuffer, srcUrl});
          const blob = new Blob([glbData]);
          return blob;
        }
      }
      return new Response('Quality not supported', {status: 404});
    } else {
      return new Response('Not Found', {status: 404});
    }
  });

  return app;
};