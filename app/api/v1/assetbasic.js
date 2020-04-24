import { LinRouter, NotFound, disableLoading } from 'lin-mizar';
import { groupRequired } from '../../middleware/jwt';
import {
  AssetbasicSearchValidator,
  CreateOrUpdateAssetbasicValidator
} from '../../validator/assetbasic';
import { PositiveIdValidator } from '../../validator/common';

import { getSafeParamId } from '../../lib/util';
import { AssetbasicNotFound } from '../../lib/err-code';
import { AssetbasicDao } from '../../dao/assetbasic';

// assetbasic 的红图实例
const assetbasicApi = new LinRouter({
  prefix: '/v1/assetbasic'
});

// assetbasic 的dao 数据库访问层实例
const assetbasicDto = new AssetbasicDao();

assetbasicApi.get('/:id', async ctx => {
  const v = await new PositiveIdValidator().validate(ctx);
  const id = v.get('path.id');
  const assetbasic = await assetbasicDto.getAssetbasic(id);
  if (!assetbasic) {
    throw new NotFound({
      msg: '没有找到相关资产条目'
    });
  }
  ctx.json(assetbasic);
});

assetbasicApi.get('/', async ctx => {
  const assetbasics = await assetbasicDto.getAssetbasics();
  // if (!assetbasics || assetbasics.length < 1) {
  //   throw new NotFound({
  //     msg: '没有找到相关资产条目'
  //   });
  // }
  ctx.json(assetbasics);
});

assetbasicApi.get('/search/one', async ctx => {
  const v = await new AssetbasicSearchValidator().validate(ctx);
  const assetbasic = await assetbasicDto.getAssetbasicByKeyword(v.get('query.q'));
  if (!assetbasic) {
    throw new AssetbasicNotFound();
  }
  ctx.json(assetbasic);
});

assetbasicApi.post('/', async ctx => {
  const v = await new CreateOrUpdateAssetbasicValidator().validate(ctx);
  await assetbasicDto.createAssetbasic(v);
  ctx.success({
    msg: '新建资产条目成功',
    errorCode: 10
  });
});

assetbasicApi.put('/:id', async ctx => {
  const v = await new CreateOrUpdateAssetbasicValidator().validate(ctx);
  const id = getSafeParamId(ctx);
  await assetbasicDto.updateAssetbasic(v, id);
  ctx.success({
    msg: '更新资产条目成功',
    errorCode: 11
  });
});

assetbasicApi.linDelete(
  'deleteAssetbasic',
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
    await assetbasicDto.deleteAssetbasic(id);
    ctx.success({
      msg: '删除资产条目成功',
      errorCode: 12
    });
  }
);

module.exports = { assetbasicApi, [disableLoading]: false };
