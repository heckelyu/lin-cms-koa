import { LinValidator, Rule } from 'lin-mizar';

class CategorySearchValidator extends LinValidator {
  constructor () {
    super();
    this.q = new Rule('isNotEmpty', '必须传入搜索关键字');
  }
}

class CreateOrUpdateCategoryValidator extends LinValidator {
  constructor () {
    super();
    this.code = new Rule('isNotEmpty', '必须传入实物类别代码');
    this.name = new Rule('isNotEmpty', '必须传入实物类别名称');
  }
}

export { CreateOrUpdateCategoryValidator, CategorySearchValidator };
