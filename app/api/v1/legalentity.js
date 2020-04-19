import { LinRouter, NotFound, disableLoading } from 'lin-mizar';
import { groupRequired } from '../../middleware/jwt';
import {
  LegalentitySearchValidator,
  CreateOrUpdateLegalentityValidator
} from '../../validator/legalentity';
import { PositiveIdValidator } from '../../validator/common';

import { getSafeParamId } from '../../lib/util';
import { LegalentityNotFound } from '../../lib/err-code';
import { LegalentityDao } from '../../dao/legalentity';

// legalentity 的红图实例
const legalentityApi = new LinRouter({
  prefix: '/v1/legalentity'
});

// legalentity 的dao 数据库访问层实例
const legalentityDto = new LegalentityDao();

legalentityApi.get('/:id', async ctx => {
  const v = await new PositiveIdValidator().validate(ctx);
  const id = v.get('path.id');
  const legalentity = await legalentityDto.getLegalentity(id);
  if (!legalentity) {
    throw new NotFound({
      msg: '没有找到相关法人单位'
    });
  }
  ctx.json(legalentity);
});

legalentityApi.get('/', async ctx => {
  const legalentitys = await legalentityDto.getLegalentitys();
  // if (!legalentitys || legalentitys.length < 1) {
  //   throw new NotFound({
  //     msg: '没有找到相关法人单位'
  //   });
  // }
  ctx.json(legalentitys);
});

legalentityApi.get('/search/one', async ctx => {
  const v = await new LegalentitySearchValidator().validate(ctx);
  const legalentity = await legalentityDto.getLegalentityByKeyword(v.get('query.q'));
  if (!legalentity) {
    throw new LegalentityNotFound();
  }
  ctx.json(legalentity);
});

legalentityApi.post('/', async ctx => {
  const v = await new CreateOrUpdateLegalentityValidator().validate(ctx);
  await legalentityDto.createLegalentity(v);
  ctx.success({
    msg: '新建法人单位成功',
    errorCode: 10
  });
});

legalentityApi.put('/:id', async ctx => {
  const v = await new CreateOrUpdateLegalentityValidator().validate(ctx);
  const id = getSafeParamId(ctx);
  await legalentityDto.updateLegalentity(v, id);
  ctx.success({
    msg: '更新法人单位成功',
    errorCode: 11
  });
});

legalentityApi.linDelete(
  'deleteLegalentity',
  '/:id',
  {
    permission: '删除法人单位',
    module: '法人单位',
    mount: true
  },
  groupRequired,
  async ctx => {
    const v = await new PositiveIdValidator().validate(ctx);
    const id = v.get('path.id');
    await legalentityDto.deleteLegalentity(id);
    ctx.success({
      msg: '删除法人单位成功',
      errorCode: 12
    });
  }
);

module.exports = { legalentityApi, [disableLoading]: false };
