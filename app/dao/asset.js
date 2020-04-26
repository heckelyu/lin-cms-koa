import { NotFound, Forbidden } from 'lin-mizar';
import { Asset } from '../model/asset';
import Sequelize from 'sequelize';

class AssetDao {
  async getAsset (id) {
    const asset = await Asset.findOne({
      where: {
        id
      }
    });
    return asset;
  }

  async getAssetByKeyword (q) {
    const asset = await Asset.findOne({
      where: {
        asset_name: {
          [Sequelize.Op.like]: `%${q}%`
        }
      }
    });
    return asset;
  }

  async getAssets () {
    const assets = await Asset.findAll();
    return assets;
  }

  async createAsset (v) {
    const asset = await Asset.findOne({
      where: {
        asset_code: v.get('body.asset_code')
      }
    });
    if (asset) {
      throw new Forbidden({
        msg: '资产条目已存在'
      });
    }

    const bk = new Asset();
    bk.asset_code = v.get('body.asset_code');
    bk.asset_name = v.get('body.asset_name');
    bk.asset_model = v.get('body.asset_model');
    bk.asset_unit = v.get('body.asset_unit');
    bk.asset_quantity = v.get('body.asset_quantity');
    bk.capital_category_subcode = v.get('body.capital_category_subcode');
    bk.material_category_subcode = v.get('body.material_category_subcode');
    bk.expense_category_subcode = v.get('body.expense_category_subcode');
    bk.usage_category_subcode = v.get('body.usage_category_subcode');
    bk.customized_category_1_type = v.get('body.customized_category_1_type');
    bk.customized_category_1_subcode = v.get('body.customized_category_1_subcode');
    bk.asset_purchase_date = v.get('body.asset_purchase_date');
    bk.asset_owner = v.get('body.asset_owner');
    bk.asset_legal_entity = v.get('body.asset_legal_entity');
    bk.asset_owner_entity = v.get('body.asset_owner_entity');
    bk.asset_owner_dept = v.get('body.asset_owner_dept');
    bk.asset_location = v.get('body.asset_location');
    bk.asset_note = v.get('body.asset_note');
    bk.asset_image_id = v.get('body.asset_image_id');

    bk.save();
  }

  async updateAsset (v, id) {
    const asset = await Asset.findByPk(id);
    if (!asset) {
      throw new NotFound({
        msg: '没有找到相关资产条'
      });
    }

    asset.asset_code = v.get('body.asset_code');
    asset.asset_name = v.get('body.asset_name');
    asset.asset_model = v.get('body.asset_model');
    asset.asset_unit = v.get('body.asset_unit');
    asset.asset_quantity = v.get('body.asset_quantity');
    asset.capital_category_subcode = v.get('body.capital_category_subcode');
    asset.material_category_subcode = v.get('body.material_category_subcode');
    asset.expense_category_subcode = v.get('body.expense_category_subcode');
    asset.usage_category_subcode = v.get('body.usage_category_subcode');
    asset.customized_category_1_type = v.get('body.customized_category_1_type');
    asset.customized_category_1_subcode = v.get('body.customized_category_1_subcode');
    asset.asset_purchase_date = v.get('body.asset_purchase_date');
    asset.asset_owner = v.get('body.asset_owner');
    asset.asset_legal_entity = v.get('body.asset_legal_entity');
    asset.asset_owner_entity = v.get('body.asset_owner_entity');
    asset.asset_owner_dept = v.get('body.asset_owner_dept');
    asset.asset_location = v.get('body.asset_location');
    asset.asset_note = v.get('body.asset_note');
    asset.asset_image_id = v.get('body.asset_image_id');

    asset.save();
  }

  async deleteAsset (id) {
    const asset = await Asset.findOne({
      where: {
        id
      }
    });
    if (!asset) {
      throw new NotFound({
        msg: '没有找到相关资产条目'
      });
    }
    asset.destroy();
  }
}

export { AssetDao };
