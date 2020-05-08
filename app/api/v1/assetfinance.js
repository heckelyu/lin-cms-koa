import { LinRouter, NotFound, disableLoading } from 'lin-mizar';
import { groupRequired } from '../../middleware/jwt';
import {
  AssetfinanceSearchValidator,
  CreateOrUpdateAssetfinanceValidator
} from '../../validator/assetfinance';
import { PositiveIdValidator } from '../../validator/common';

import { getSafeParamId } from '../../lib/util';
import { AssetfinanceNotFound } from '../../lib/err-code';
import { AssetfinanceDao } from '../../dao/assetfinance';

// assetfinance 的红图实例
const assetfinanceApi = new LinRouter({
  prefix: '/v1/assetfinance'
});

// assetfinance 的dao 数据库访问层实例
const assetfinanceDto = new AssetfinanceDao();

assetfinanceApi.get('/:id', async ctx => {
  const v = await new PositiveIdValidator().validate(ctx);
  const id = v.get('path.id');
  const assetfinance = await assetfinanceDto.getAssetfinance(id);
  if (!assetfinance) {
    throw new NotFound({
      msg: '没有找到相关资产条目'
    });
  }
  ctx.json(assetfinance);
});

assetfinanceApi.get('/', async ctx => {
  const assetfinances = await assetfinanceDto.getAssetfinances();
  // if (!assetfinances || assetfinances.length < 1) {
  //   throw new NotFound({
  //     msg: '没有找到相关资产条目'
  //   });
  // }
  ctx.json(assetfinances);
});

assetfinanceApi.get('/search/one', async ctx => {
  const v = await new AssetfinanceSearchValidator().validate(ctx);
  const assetfinance = await assetfinanceDto.getAssetfinanceByKeyword(v.get('query.q'));
  if (!assetfinance) {
    throw new AssetfinanceNotFound();
  }
  ctx.json(assetfinance);
});

assetfinanceApi.post('/', async ctx => {
  const v = await new CreateOrUpdateAssetfinanceValidator().validate(ctx);
  await assetfinanceDto.createAssetfinance(v);
  ctx.success({
    msg: '新建资产条目成功',
    errorCode: 10
  });
});

assetfinanceApi.put('/:id', async ctx => {
  const v = await new CreateOrUpdateAssetfinanceValidator().validate(ctx);
  const id = getSafeParamId(ctx);
  await assetfinanceDto.updateAssetfinance(v, id);
  ctx.success({
    msg: '更新资产条目成功',
    errorCode: 11
  });
});

assetfinanceApi.linDelete(
  'deleteAssetfinance',
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
    await assetfinanceDto.deleteAssetfinance(id);
    ctx.success({
      msg: '删除资产条目成功',
      errorCode: 12
    });
  }
);

module.exports = { assetfinanceApi, [disableLoading]: false };
