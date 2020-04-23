import { LinRouter, NotFound, disableLoading } from 'lin-mizar';
import { groupRequired } from '../../middleware/jwt';
import {
  CheckrecordSearchValidator,
  CreateOrUpdateCheckrecordValidator
} from '../../validator/checkrecord';
import { PositiveIdValidator } from '../../validator/common';

import { getSafeParamId } from '../../lib/util';
import { CheckrecordNotFound } from '../../lib/err-code';
import { CheckrecordDao } from '../../dao/checkrecord';

// checkrecord 的红图实例
const checkrecordApi = new LinRouter({
  prefix: '/v1/checkrecord'
});

// checkrecord 的dao 数据库访问层实例
const checkrecordDto = new CheckrecordDao();

checkrecordApi.get('/:id', async ctx => {
  const v = await new PositiveIdValidator().validate(ctx);
  const id = v.get('path.id');
  const checkrecord = await checkrecordDto.getCheckrecord(id);
  if (!checkrecord) {
    throw new NotFound({
      msg: '没有找到相关法人单位'
    });
  }
  ctx.json(checkrecord);
});

checkrecordApi.get('/', async ctx => {
  const checkrecords = await checkrecordDto.getCheckrecords();
  // if (!checkrecords || checkrecords.length < 1) {
  //   throw new NotFound({
  //     msg: '没有找到相关法人单位'
  //   });
  // }
  ctx.json(checkrecords);
});

checkrecordApi.get('/search/one', async ctx => {
  const v = await new CheckrecordSearchValidator().validate(ctx);
  const checkrecord = await checkrecordDto.getCheckrecordByKeyword(v.get('query.q'));
  if (!checkrecord) {
    throw new CheckrecordNotFound();
  }
  ctx.json(checkrecord);
});

checkrecordApi.post('/', async ctx => {
  const v = await new CreateOrUpdateCheckrecordValidator().validate(ctx);
  await checkrecordDto.createCheckrecord(v);
  ctx.success({
    msg: '新建法人单位成功',
    errorCode: 10
  });
});

checkrecordApi.put('/:id', async ctx => {
  const v = await new CreateOrUpdateCheckrecordValidator().validate(ctx);
  const id = getSafeParamId(ctx);
  await checkrecordDto.updateCheckrecord(v, id);
  ctx.success({
    msg: '更新法人单位成功',
    errorCode: 11
  });
});

checkrecordApi.linDelete(
  'deleteCheckrecord',
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
    await checkrecordDto.deleteCheckrecord(id);
    ctx.success({
      msg: '删除法人单位成功',
      errorCode: 12
    });
  }
);

module.exports = { checkrecordApi, [disableLoading]: false };
