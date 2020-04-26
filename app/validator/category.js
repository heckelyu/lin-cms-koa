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
    this.category_type = new Rule('isNotEmpty', '必须传入分类类型编码');
    this.category_name = new Rule('isNotEmpty', '必须传入分类类型名称');
    this.sub_code = new Rule('isNotEmpty', '必须传入类别代码');
    this.sub_name = new Rule('isNotEmpty', '必须传入类别名称');
  }
}

export { CreateOrUpdateCategoryValidator, CategorySearchValidator };
