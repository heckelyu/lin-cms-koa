import { LinRouter, NotFound, disableLoading } from 'lin-mizar';
import { groupRequired } from '../../middleware/jwt';
import {
  AssetSearchValidator,
  CreateOrUpdateAssetValidator
} from '../../validator/asset';
import { PositiveIdValidator } from '../../validator/common';

import { getSafeParamId } from '../../lib/util';
import { AssetNotFound } from '../../lib/err-code';
import { AssetDao } from '../../dao/asset';

// asset 的红图实例
const assetApi = new LinRouter({
  prefix: '/v1/asset'
});

// asset 的dao 数据库访问层实例
const assetDto = new AssetDao();

assetApi.get('/:id', async ctx => {
  const v = await new PositiveIdValidator().validate(ctx);
  const id = v.get('path.id');
  const asset = await assetDto.getAsset(id);
  if (!asset) {
    throw new NotFound({
      msg: '没有找到相关资产条目'
    });
  }
  ctx.json(asset);
});

assetApi.get('/', async ctx => {
  const assets = await assetDto.getAssets();
  // if (!assets || assets.length < 1) {
  //   throw new NotFound({
  //     msg: '没有找到相关资产条目'
  //   });
  // }
  ctx.json(assets);
});

assetApi.get('/search/one', async ctx => {
  const v = await new AssetSearchValidator().validate(ctx);
  const asset = await assetDto.getAssetByKeyword(v.get('query.q'));
  if (!asset) {
    throw new AssetNotFound();
  }
  ctx.json(asset);
});

assetApi.post('/', async ctx => {
  const v = await new CreateOrUpdateAssetValidator().validate(ctx);
  await assetDto.createAsset(v);
  ctx.success({
    msg: '新建资产条目成功',
    errorCode: 10
  });
});

assetApi.put('/:id', async ctx => {
  const v = await new CreateOrUpdateAssetValidator().validate(ctx);
  const id = getSafeParamId(ctx);
  await assetDto.updateAsset(v, id);
  ctx.success({
    msg: '更新资产条目成功',
    errorCode: 11
  });
});

assetApi.linDelete(
  'deleteAsset',
  '/:id',
  {
    permission: '删除资产条目',
    module: '资产条目',
    mount: true
  },
  groupRequired,
  async ctx => {
    const v = await new PositiveIdValidator().validate(ctx);
    const id = v.get('path.id');
    await assetDto.deleteAsset(id);
    ctx.success({
      msg: '删除资产条目成功',
      errorCode: 12
    });
  }
);

module.exports = { assetApi, [disableLoading]: false };
