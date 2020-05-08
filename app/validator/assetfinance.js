import { LinValidator, Rule } from 'lin-mizar';

class AssetfinanceSearchValidator extends LinValidator {
  constructor () {
    super();
    this.q = new Rule('isNotEmpty', '必须传入搜索关键字');
  }
}

class CreateOrUpdateAssetfinanceValidator extends LinValidator {
  constructor () {
    super();
    this.af_asset_id = new Rule('isNotEmpty', '必须传入资产代码');
    this.af_proofs_code = new Rule('isNotEmpty', '必须传入资产凭证编号');
  }
}

export { CreateOrUpdateAssetfinanceValidator, AssetfinanceSearchValidator };