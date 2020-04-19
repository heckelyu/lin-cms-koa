import { LinValidator, Rule } from 'lin-mizar';

class LegalentitySearchValidator extends LinValidator {
  constructor () {
    super();
    this.q = new Rule('isNotEmpty', '必须传入搜索关键字');
  }
}

class CreateOrUpdateLegalentityValidator extends LinValidator {
  constructor () {
    super();
    this.entity_code = new Rule('isNotEmpty', '必须传入法人单位代码');
    this.entity_name = new Rule('isNotEmpty', '必须传入法人单位名称');
  }
}

export { CreateOrUpdateLegalentityValidator, LegalentitySearchValidator };
