import { LinValidator, Rule } from 'lin-mizar';

class AssetbasicSearchValidator extends LinValidator {
  constructor () {
    super();
    this.q = new Rule('isNotEmpty', '必须传入搜索关键字');
  }
}

class CreateOrUpdateAssetbasicValidator extends LinValidator {
  constructor () {
    super();
    this.asset_code = new Rule('isNotEmpty', '必须传入资产代码');
    this.asset_name = new Rule('isNotEmpty', '必须传入资产名称');
    this.asset_unit = new Rule('isNotEmpty', '必须传入资产单位');
    this.asset_quantity = new Rule('isNotEmpty', '必须传入资产数量');
    this.asset_category = new Rule('isNotEmpty', '必须传入资产实体类别');
  }
}

export { CreateOrUpdateAssetbasicValidator, AssetbasicSearchValidator };