import { InfoCrudMixin } from 'lin-mizar';
import { merge } from 'lodash';
import { Sequelize, Model } from 'sequelize';
import sequelize from '../lib/db';

class Asset extends Model {
  toJSON () {
    const origin = {
      id: this.id,
      asset_code: this.asset_code,
      asset_name: this.asset_name,
      asset_model: this.asset_model,
      asset_unit: this.asset_unit,
      asset_quantity: this.asset_quantity,
      capital_category_subcode: this.capital_category_subcode,
      material_category_subcode: this.material_category_subcode,
      expense_category_subcode: this.expense_category_subcode,
      usage_category_subcode: this.usage_category_subcode,
      customized_category_1_type: this.customized_category_1_type,
      customized_category_1_subcode: this.customized_category_1_subcode,
      asset_purchase_date: this.asset_purchase_date,
      asset_owner: this.asset_owner,
      asset_legal_entity: this.asset_legal_entity,
      asset_owner_entity: this.asset_owner_entity,
      asset_owner_dept: this.asset_owner_dept,
      asset_location: this.asset_location,
      asset_note: this.asset_note,
      asset_image_id: this.asset_image_id,
      asset_proofs_code: this.asset_proofs_code,
      asset_original_value: this.asset_original_value,
      asset_net_value: this.asset_net_value,
      asset_depreciation_this_year: this.asset_depreciation_this_year,
      asset_depreciation_this_month: this.asset_depreciation_this_month,
      asset_residual_value: this.asset_residual_value,
      asset_account_entry_date: this.asset_account_entry_date,
      asset_depreciation_years: this.asset_depreciation_years,
      asset_depreciated_months: this.asset_depreciated_months,
      asset_write_off_status: this.asset_write_off_status,
      asset_write_off_reason: this.asset_write_off_reason,
      asset_write_off_note: this.asset_write_off_note,
      asset_is_subitem: this.asset_is_subitem
    };
    return origin;
  }
}

Asset.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    asset_code: {
      type: Sequelize.STRING(64),
      allowNull: false
    },
    asset_name: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    asset_model: {
      type: Sequelize.STRING(64),
      allowNull: true
    },
    asset_unit: {
      type: Sequelize.STRING(16),
      allowNull: false
    },
    asset_quantity: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    capital_category_subcode: {
      type: Sequelize.STRING(16),
      allowNull: false
    },
    material_category_subcode: {
      type: Sequelize.STRING(16),
      allowNull: true
    },
    expense_category_subcode: {
      type: Sequelize.STRING(16),
      allowNull: true
    },
    usage_category_subcode: {
      type: Sequelize.STRING(16),
      allowNull: true
    },
    customized_category_1_type: {
      type: Sequelize.STRING(16),
      allowNull: true
    },
    customized_category_1_subcode: {
      type: Sequelize.STRING(16),
      allowNull: true
    },
    asset_purchase_date: {
      type: Sequelize.DATE,
      allowNull: true
    },
    asset_owner: {
      type: Sequelize.STRING(16),
      allowNull: true,
      defaultValue: '无'
    },
    asset_legal_entity: {
      type: Sequelize.STRING(32),
      allowNull: true,
      defaultValue: '无'
    },
    asset_owner_entity: {
      type: Sequelize.STRING(32),
      allowNull: true,
      defaultValue: '无'
    },
    asset_owner_dept: {
      type: Sequelize.STRING(32),
      allowNull: true,
      defaultValue: '无'
    },
    asset_location: {
      type: Sequelize.STRING(64),
      allowNull: true,
      defaultValue: '无'
    },
    asset_note: {
      type: Sequelize.STRING(255),
      allowNull: true,
      defaultValue: '无'
    },
    asset_image_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: '1'
    },
    asset_proofs_code: {
      type: Sequelize.STRING(64),
      allowNull: true
    },
    asset_original_value: {
      type: Sequelize.DECIMAL(18, 2),
      allowNull: true
    },
    asset_net_value: {
      type: Sequelize.DECIMAL(18, 2),
      allowNull: true
    },
    asset_depreciation_this_year: {
      type: Sequelize.DECIMAL(18, 2),
      allowNull: true
    },
    asset_depreciation_this_month: {
      type: Sequelize.DECIMAL(18, 2),
      allowNull: true
    },
    asset_residual_value: {
      type: Sequelize.DECIMAL(18, 2),
      allowNull: true
    },
    asset_account_entry_date: {
      type: Sequelize.DATE,
      allowNull: true
    },
    asset_depreciation_years: {
      type: Sequelize.TINYINT,
      allowNull: true
    },
    asset_depreciated_months: {
      type: Sequelize.SMALLINT,
      allowNull: true
    },
    asset_write_off_status: {
      type: Sequelize.STRING(8),
      allowNull: true
    },
    asset_write_off_reason: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    asset_write_off_note: {
      type: Sequelize.STRING(512),
      allowNull: true
    },
    asset_is_subitem: {
      type: Sequelize.TINYINT,
      allowNull: true
    }
  },
  merge(
    {
      tableName: 'asset',
      modelName: 'asset',
      sequelize
    },
    InfoCrudMixin.options
  )
);

export { Asset };
