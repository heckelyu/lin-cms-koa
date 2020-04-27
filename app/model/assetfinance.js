import { InfoCrudMixin } from 'lin-mizar';
import { merge } from 'lodash';
import { Sequelize, Model } from 'sequelize';
import sequelize from '../lib/db';

class Assetfinance extends Model {
  toJSON () {
    const origin = {
      id: this.id,
      af_asset_id: this.af_asset_id,
      af_proofs_code: this.af_proofs_code,
      af_original_value: this.af_original_value,
      af_net_value: this.af_net_value,
      af_depreciation_this_year: this.af_depreciation_this_year,
      af_depreciation_this_month: this.af_depreciation_this_month,
      af_residual_value: this.af_residual_value,
      af_account_entry_date: this.af_account_entry_date,
      af_depreciation_years: this.af_depreciation_years,
      af_depreciated_months: this.af_depreciated_months,
      af_write_off_status: this.af_write_off_status,
      af_write_off_reason: this.af_write_off_reason,
      af_write_off_note: this.af_write_off_note,
      af_is_subitem: this.af_is_subitem
    };
    return origin;
  }
}

Assetfinance.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    af_asset_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    af_proofs_code: {
      type: Sequelize.STRING(64),
      allowNull: false
    },
    af_original_value: {
      type: Sequelize.DECIMAL(18, 2),
      allowNull: true
    },
    af_net_value: {
      type: Sequelize.DECIMAL(18, 2),
      allowNull: true
    },
    af_depreciation_this_year: {
      type: Sequelize.DECIMAL(18, 2),
      allowNull: true
    },
    af_depreciation_this_month: {
      type: Sequelize.DECIMAL(18, 2),
      allowNull: true
    },
    af_residual_value: {
      type: Sequelize.DECIMAL(18, 2),
      allowNull: true
    },
    af_account_entry_date: {
      type: Sequelize.DATE,
      allowNull: true
    },
    af_depreciation_years: {
      type: Sequelize.TINYINT,
      allowNull: true
    },
    af_depreciated_months: {
      type: Sequelize.SMALLINT,
      allowNull: true
    },
    af_write_off_status: {
      type: Sequelize.STRING(8),
      allowNull: true
    },
    af_write_off_reason: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    af_write_off_note: {
      type: Sequelize.STRING(512),
      allowNull: true
    },
    af_is_subitem: {
      type: Sequelize.TINYINT,
      allowNull: true
    }
  },

  merge(
    {
      tableName: 'asset_finance',
      modelName: 'assetfinance',
      sequelize
    },
    InfoCrudMixin.options
  )
);

export { Assetfinance };
