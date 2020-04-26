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
      asset_image_id: this.asset_image_id
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
    }
  },
  merge(
    {
      tableName: 'asset_basic',
      modelName: 'asset',
      sequelize
    },
    InfoCrudMixin.options
  )
);

export { Asset };
