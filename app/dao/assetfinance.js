import { NotFound, Forbidden } from 'lin-mizar';
import { Assetfinance } from '../model/assetfinance';
import Sequelize from 'sequelize';

class AssetfinanceDao {
  async getAssetfinance (id) {
    const assetfinance = await Assetfinance.findOne({
      where: {
        id
      }
    });
    return assetfinance;
  }

  async getAssetfinanceByKeyword (q) {
    const assetfinance = await Assetfinance.findOne({
      where: {
        af_proofs_code: {
          [Sequelize.Op.like]: `%${q}%`
        }
      }
    });
    return assetfinance;
  }

  async getAssetfinances () {
    const assetfinances = await Assetfinance.findAll();
    return assetfinances;
  }

  async createAssetfinance (v) {
    const assetfinance = await Assetfinance.findOne({
      where: {
        af_asset_id: v.get('body.af_asset_id')
      }
    });
    if (assetfinance) {
      throw new Forbidden({
        msg: '资产条目已存在'
      });
    }
    const bk = new Assetfinance();
    bk.af_asset_id = v.get('body.af_asset_id');
    bk.af_proofs_code = v.get('body.af_proofs_code');
    bk.af_original_value = v.get('body.af_original_value');
    bk.af_net_value = v.get('body.af_net_value');
    bk.af_depreciation_this_year = v.get('body.af_depreciation_this_year');
    bk.af_depreciation_this_month = v.get('body.af_depreciation_this_month');
    bk.af_residual_value = v.get('body.af_residual_value');
    bk.af_account_entry_date = v.get('body.af_account_entry_date');
    bk.af_depreciation_years = v.get('body.af_depreciation_years');
    bk.af_depreciated_months = v.get('body.af_depreciated_months');
    bk.af_write_off_status = v.get('body.af_write_off_status');
    bk.af_write_off_reason = v.get('body.af_write_off_reason');
    bk.af_write_off_note = v.get('body.af_write_off_note');
    bk.af_is_subitem = v.get('body.af_is_subitem');

    bk.save();
  }

  async updateAssetfinance (v, id) {
    const assetfinance = await Assetfinance.findByPk(id);
    if (!assetfinance) {
      throw new NotFound({
        msg: '没有找到相关资产条目'
      });
    }

    assetfinance.af_asset_id = v.get('body.af_asset_id');
    assetfinance.af_proofs_code = v.get('body.af_proofs_code');
    assetfinance.af_original_value = v.get('body.af_original_value');
    assetfinance.af_net_value = v.get('body.af_net_value');
    assetfinance.af_depreciation_this_year = v.get('body.af_depreciation_this_year');
    assetfinance.af_depreciation_this_month = v.get('body.af_depreciation_this_month');
    assetfinance.af_residual_value = v.get('body.af_residual_value');
    assetfinance.af_account_entry_date = v.get('body.af_account_entry_date');
    assetfinance.af_depreciation_years = v.get('body.af_depreciation_years');
    assetfinance.af_depreciated_months = v.get('body.af_depreciated_months');
    assetfinance.af_write_off_status = v.get('body.af_write_off_status');
    assetfinance.af_write_off_reason = v.get('body.af_write_off_reason');
    assetfinance.af_write_off_note = v.get('body.af_write_off_note');
    assetfinance.af_is_subitem = v.get('body.af_is_subitem');

    assetfinance.save();
  }

  async deleteAssetfinance (id) {
    const assetfinance = await Assetfinance.findOne({
      where: {
        id
      }
    });
    if (!assetfinance) {
      throw new NotFound({
        msg: '没有找到相关资产条目'
      });
    }
    assetfinance.destroy();
  }
}

export { AssetfinanceDao };
