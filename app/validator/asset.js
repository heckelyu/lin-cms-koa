import { LinValidator, Rule } from 'lin-mizar';

class AssetSearchValidator extends LinValidator {
  constructor () {
    super();
    this.q = new Rule('isNotEmpty', '必须传入搜索关键字');
  }
}

class CreateOrUpdateAssetValidator extends LinValidator {
  constructor () {
    super();
    this.asset_code = new Rule('isNotEmpty', '必须传入资产代码');
    this.asset_name = new Rule('isNotEmpty', '必须传入资产名称');
    this.asset_unit = new Rule('isNotEmpty', '必须传入资产单位');
    this.asset_quantity = new Rule('isNotEmpty', '必须传入资产数量');
    this.capital_category_subcode = new Rule('isNotEmpty', '必须传入至少一个资产分类名称');
  }
}

export { CreateOrUpdateAssetValidator, AssetSearchValidator };