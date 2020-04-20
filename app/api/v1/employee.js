import { LinRouter, NotFound, disableLoading } from 'lin-mizar';
import { groupRequired } from '../../middleware/jwt';
import {
  EmployeeSearchValidator,
  CreateOrUpdateEmployeeValidator
} from '../../validator/employee';
import { PositiveIdValidator } from '../../validator/common';

import { getSafeParamId } from '../../lib/util';
import { EmployeeNotFound } from '../../lib/err-code';
import { EmployeeDao } from '../../dao/employee';

// employee 的红图实例
const employeeApi = new LinRouter({
  prefix: '/v1/employee'
});

// employee 的dao 数据库访问层实例
const employeeDto = new EmployeeDao();

employeeApi.get('/:id', async ctx => {
  const v = await new PositiveIdValidator().validate(ctx);
  const id = v.get('path.id');
  const employee = await employeeDto.getEmployee(id);
  if (!employee) {
    throw new NotFound({
      msg: '没有找到相关员工'
    });
  }
  ctx.json(employee);
});

employeeApi.get('/', async ctx => {
  const employees = await employeeDto.getEmployees();
  // if (!employees || employees.length < 1) {
  //   throw new NotFound({
  //     msg: '没有找到相关法人单位'
  //   });
  // }
  ctx.json(employees);
});

employeeApi.get('/search/one', async ctx => {
  const v = await new EmployeeSearchValidator().validate(ctx);
  const employee = await employeeDto.getEmployeeByKeyword(v.get('query.q'));
  if (!employee) {
    throw new EmployeeNotFound();
  }
  ctx.json(employee);
});

employeeApi.post('/', async ctx => {
  const v = await new CreateOrUpdateEmployeeValidator().validate(ctx);
  await employeeDto.createEmployee(v);
  ctx.success({
    msg: '新增员工信息成功',
    errorCode: 10
  });
});

employeeApi.put('/:id', async ctx => {
  const v = await new CreateOrUpdateEmployeeValidator().validate(ctx);
  const id = getSafeParamId(ctx);
  await employeeDto.updateEmployee(v, id);
  ctx.success({
    msg: '更新员工信息成功',
    errorCode: 11
  });
});

employeeApi.linDelete(
  'deleteEmployee',
  '/:id',
  {
    permission: '删除员工信息',
    module: '员工管理',
    mount: true
  },
  groupRequired,
  async ctx => {
    const v = await new PositiveIdValidator().validate(ctx);
    const id = v.get('path.id');
    await employeeDto.deleteEmployee(id);
    ctx.success({
      msg: '删除员工信息成功',
      errorCode: 12
    });
  }
);

module.exports = { employeeApi, [disableLoading]: false };
