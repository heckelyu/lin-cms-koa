import { InfoCrudMixin } from 'lin-mizar';
import { merge } from 'lodash';
import { Sequelize, Model } from 'sequelize';
import sequelize from '../lib/db';

class Assetbasic extends Model {
  toJSON () {
    const origin = {
      id: this.id,
      asset_code: this.asset_code,
      asset_name: this.asset_name,
      asset_model: this.asset_model,
      asset_unit: this.asset_unit,
      asset_quantity: this.asset_quantity,
      asset_category: this.asset_category,
      asset_status: this.asset_status,
      asset_owner: this.asset_owner,
      asset_entity: this.asset_entity
    };
    return origin;
  }
}

Assetbasic.init(
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
    asset_category: {
      type: Sequelize.STRING(8),
      allowNull: false
    },
    asset_status: {
      type: Sequelize.STRING(8),
      allowNull: true,
      defaultValue: '在用'
    },
    asset_owner: {
      type: Sequelize.STRING(8),
      allowNull: true,
      defaultValue: '无'
    },
    asset_entity: {
      type: Sequelize.STRING(8),
      allowNull: true,
      defaultValue: '无'
    }
  },
  merge(
    {
      tableName: 'asset_basic',
      modelName: 'assetbasic',
      sequelize
    },
    InfoCrudMixin.options
  )
);

export { Assetbasic };
