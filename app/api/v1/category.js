import { LinRouter, NotFound, disableLoading } from 'lin-mizar';
import { groupRequired } from '../../middleware/jwt';
import {
  CategorySearchValidator,
  CategoryTypeValidator,
  CreateOrUpdateCategoryValidator
} from '../../validator/category';
import { PositiveIdValidator } from '../../validator/common';

import { getSafeParamId } from '../../lib/util';
import { CategoryNotFound } from '../../lib/err-code';
import { CategoryDao } from '../../dao/category';

// category 的红图实例
const categoryApi = new LinRouter({
  prefix: '/v1/category'
});

// category 的dao 数据库访问层实例
const categoryDto = new CategoryDao();

categoryApi.get('/:id', async ctx => {
  const v = await new PositiveIdValidator().validate(ctx);
  const id = v.get('path.id');
  const category = await categoryDto.getCategory(id);
  if (!category) {
    throw new NotFound({
      msg: '没有找到相关资产类别'
    });
  }
  ctx.json(category);
});

categoryApi.get('/', async ctx => {
  const categorys = await categoryDto.getCategorys();
  // if (!categorys || categorys.length < 1) {
  //   throw new NotFound({
  //     msg: '没有找到相关资产类别'
  //   });
  // }
  ctx.json(categorys);
});

categoryApi.get('/type/:qtype', async ctx => {
  const v = await new CategoryTypeValidator().validate(ctx);
  const qType = v.get('path.qtype');
  const categorys = await categoryDto.getCategoryByType(qType);
  if (!categorys) {
    throw new NotFound({
      msg: '没有找到相关资产类别'
    });
  }
  ctx.json(categorys);
});

categoryApi.get('/search/one', async ctx => {
  const v = await new CategorySearchValidator().validate(ctx);
  const category = await categoryDto.getCategoryByKeyword(v.get('query.q'));
  if (!category) {
    throw new CategoryNotFound();
  }
  ctx.json(category);
});

categoryApi.post('/', async ctx => {
  const v = await new CreateOrUpdateCategoryValidator().validate(ctx);
  await categoryDto.createCategory(v);
  ctx.success({
    msg: '新建资产类别成功',
    errorCode: 10
  });
});

categoryApi.put('/:id', async ctx => {
  const v = await new CreateOrUpdateCategoryValidator().validate(ctx);
  const id = getSafeParamId(ctx);
  await categoryDto.updateCategory(v, id);
  ctx.success({
    msg: '更新资产类别成功',
    errorCode: 11
  });
});

categoryApi.linDelete(
  'deleteCategory',
  '/:id',
  {
    permission: '删除资产类别',
    module: '资产类别',
    mount: true
  },
  groupRequired,
  async ctx => {
    const v = await new PositiveIdValidator().validate(ctx);
    const id = v.get('path.id');
    await categoryDto.deleteCategory(id);
    ctx.success({
      msg: '删除资产类别成功',
      errorCode: 12
    });
  }
);

module.exports = { categoryApi, [disableLoading]: false };
