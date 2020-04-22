import { NotFound, Forbidden } from 'lin-mizar';
import { Assetbasic } from '../model/assetbasic';
import Sequelize from 'sequelize';

class AssetbasicDao {
  async getAssetbasic (id) {
    const assetbasic = await Assetbasic.findOne({
      where: {
        id
      }
    });
    return assetbasic;
  }

  async getAssetbasicByKeyword (q) {
    const assetbasic = await Assetbasic.findOne({
      where: {
        asset_name: {
          [Sequelize.Op.like]: `%${q}%`
        }
      }
    });
    return assetbasic;
  }

  async getAssetbasics () {
    const assetbasics = await Assetbasic.findAll();
    return assetbasics;
  }

  async createAssetbasic (v) {
    const assetbasic = await Assetbasic.findOne({
      where: {
        asset_code: v.get('body.asset_code')
      }
    });
    if (assetbasic) {
      throw new Forbidden({
        msg: '资产条目已存在'
      });
    }

    const bk = new Assetbasic();
    bk.asset_code = v.get('body.asset_code');
    bk.asset_name = v.get('body.asset_name');
    bk.asset_model = v.get('body.asset_model');
    bk.asset_unit = v.get('body.asset_unit');
    bk.asset_quantity = v.get('body.asset_quantity');
    bk.asset_category = v.get('body.asset_category');
    bk.asset_status = v.get('body.asset_status');
    bk.asset_owner = v.get('body.asset_owner');
    bk.asset_entity = v.get('body.asset_entity');

    bk.save();
  }

  async updateAssetbasic (v, id) {
    const assetbasic = await Assetbasic.findByPk(id);
    if (!assetbasic) {
      throw new NotFound({
        msg: '没有找到相关资产条'
      });
    }

    assetbasic.asset_code = v.get('body.asset_code');
    assetbasic.asset_name = v.get('body.asset_name');
    assetbasic.asset_model = v.get('body.asset_model');
    assetbasic.asset_unit = v.get('body.asset_unit');
    assetbasic.asset_quantity = v.get('body.asset_quantity');
    assetbasic.asset_category = v.get('body.asset_category');
    assetbasic.asset_status = v.get('body.asset_status');
    assetbasic.asset_owner = v.get('body.asset_owner');
    assetbasic.asset_entity = v.get('body.asset_entity');

    assetbasic.save();
  }

  async deleteAssetbasic (id) {
    const assetbasic = await Assetbasic.findOne({
      where: {
        id
      }
    });
    if (!assetbasic) {
      throw new NotFound({
        msg: '没有找到相关资产条目'
      });
    }
    assetbasic.destroy();
  }
}

export { AssetbasicDao };
