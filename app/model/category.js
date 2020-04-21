import { InfoCrudMixin } from 'lin-mizar';
import { merge } from 'lodash';
import { Sequelize, Model } from 'sequelize';
import sequelize from '../lib/db';

class Category extends Model {
  toJSON () {
    const origin = {
      id: this.id,
      code: this.code,
      name: this.name,
      value: this.value,
      flag: this.flag,
      note: this.note
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
    code: {
      type: Sequelize.STRING(8),
      allowNull: false
    },
    name: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    value: {
      type: Sequelize.STRING(32),
      allowNull: true
    },
    flag: {
      type: Sequelize.TINYINT,
      allowNull: true
    },
    note: {
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
