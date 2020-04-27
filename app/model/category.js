import { InfoCrudMixin } from 'lin-mizar';
import { merge } from 'lodash';
import { Sequelize, Model } from 'sequelize';
import sequelize from '../lib/db';

class Category extends Model {
  toJSON () {
    const origin = {
      id: this.id,
      category_type: this.category_type,
      category_name: this.category_name,
      sub_code: this.sub_code,
      sub_name: this.sub_name,
      sub_value: this.sub_value,
      sub_flag: this.sub_flag,
      sub_note: this.sub_note
    };
    return origin;
  }
}

Category.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    category_type: {
      type: Sequelize.STRING(16),
      allowNull: false
    },
    category_name: {
      type: Sequelize.STRING(32),
      allowNull: false
    },
    sub_code: {
      type: Sequelize.STRING(16),
      allowNull: false
    },
    sub_name: {
      type: Sequelize.STRING(128),
      allowNull: false
    },
    sub_value: {
      type: Sequelize.STRING(32),
      allowNull: true
    },
    sub_flag: {
      type: Sequelize.TINYINT,
      allowNull: true
    },
    sub_note: {
      type: Sequelize.STRING(255),
      allowNull: true
    }
  },
  merge(
    {
      tableName: 'category',
      modelName: 'category',
      sequelize
    },
    InfoCrudMixin.options
  )
);

export { Category };
