import { InfoCrudMixin } from 'lin-mizar';
import { merge } from 'lodash';
import { Sequelize, Model } from 'sequelize';
import sequelize from '../lib/db';

class Checkrecord extends Model {
  toJSON () {
    const origin = {
      id: this.id,
      asset_id: this.asset_id,
      asset_code: this.asset_code,
      entity_name: this.entity_name,
      asset_status: this.asset_status,
      check_note: this.check_note,
      check_image_id: this.check_image_id,
      check_date: this.check_date,
      check_user_id: this.check_user_id
    };
    return origin;
  }
}

Checkrecord.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    asset_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    asset_code: {
      type: Sequelize.STRING(64),
      allowNull: false
    },
    entity_name: {
      type: Sequelize.STRING(64),
      allowNull: true
    },
    asset_status: {
      type: Sequelize.TINYINT,
      allowNull: true
    },
    check_note: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    check_image_id: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    check_date:
    {
      type: Sequelize.DATE,
      allowNull: true
    },
    check_user_id:
    {
      type: Sequelize.INTEGER,
      allowNull: true
    }
  },
  merge(
    {
      tableName: 'check_record',
      modelName: 'checkrecord',
      sequelize
    },
    InfoCrudMixin.options
  )
);

export { Checkrecord };
