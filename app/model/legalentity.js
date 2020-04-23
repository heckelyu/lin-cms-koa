import { InfoCrudMixin } from 'lin-mizar';
import { merge } from 'lodash';
import { Sequelize, Model } from 'sequelize';
import sequelize from '../lib/db';

class Legalentity extends Model {
  toJSON () {
    const origin = {
      id: this.id,
      entity_code: this.entity_code,
      entity_name: this.entity_name,
      entity_abbr: this.entity_abbr,
      forgz: this.forgz,
      entity_level: this.entity_level,
      attach_to: this.attach_to
    };
    return origin;
  }
}

Legalentity.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    entity_code: {
      type: Sequelize.STRING(8),
      allowNull: false
    },
    entity_name: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    entity_abbr: {
      type: Sequelize.STRING(32),
      allowNull: true
    },
    forgz: {
      type: Sequelize.TINYINT,
      allowNull: true
    },
    entity_level: {
      type: Sequelize.TINYINT,
      allowNull: true
    },
    attach_to: {
      type: Sequelize.STRING(8),
      allowNull: true
    }
  },
  merge(
    {
      tableName: 'legal_entity',
      modelName: 'legalentity',
      sequelize
    },
    InfoCrudMixin.options
  )
);

export { Legalentity };
