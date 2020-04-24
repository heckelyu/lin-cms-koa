import { LinValidator, Rule } from 'lin-mizar';

class CheckrecordSearchValidator extends LinValidator {
  constructor () {
    super();
    this.q = new Rule('isNotEmpty', '必须传入搜索关键字');
  }
}

class CreateOrUpdateCheckrecordValidator extends LinValidator {
  constructor () {
    super();
    this.asset_code = new Rule('isNotEmpty', '必须传入资产编码');
    this.entity_name = new Rule('isNotEmpty', '必须传入产权单位名称');
  }
}

export { CreateOrUpdateCheckrecordValidator, CheckrecordSearchValidator };
