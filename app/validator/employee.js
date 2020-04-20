import { LinValidator, Rule } from 'lin-mizar';

class EmployeeSearchValidator extends LinValidator {
  constructor () {
    super();
    this.q = new Rule('isNotEmpty', '必须传入搜索关键字');
  }
}

class CreateOrUpdateEmployeeValidator extends LinValidator {
  constructor () {
    super();
    this.employee_id = new Rule('isNotEmpty', '必须传入员工工号');
    this.employee_name = new Rule('isNotEmpty', '必须传入员工姓名');
    this.entity_name = new Rule('isNotEmpty', '必须传入归属单位名称');
    this.employee_position = new Rule('isNotEmpty', '必须传入员工职位信息');
    this.gender = new Rule('isNotEmpty', '必须传入员工性别');
  }
}

export { CreateOrUpdateEmployeeValidator, EmployeeSearchValidator };