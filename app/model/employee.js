import { InfoCrudMixin } from 'lin-mizar';
import { merge } from 'lodash';
import { Sequelize, Model } from 'sequelize';
import sequelize from '../lib/db';

class Employee extends Model {
  toJSON () {
    const origin = {
      id: this.id,
      employee_id: this.employee_id,
      employee_name: this.employee_name,
      entity_name: this.entity_name,
      employee_position: this.employee_position,
      gender: this.gender,
      age: this.age,
      employment_status: this.employment_status,
      attendance_status: this.attendance_status,
      education_status: this.education_status
    };
    return origin;
  }
}

Employee.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    employee_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    employee_name: {
      type: Sequelize.STRING(32),
      allowNull: false
    },
    entity_name: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    employee_position: {
      type: Sequelize.STRING(64),
      allowNull: false
    },
    gender: {
      type: Sequelize.TINYINT,
      allowNull: false
    },
    age: {
      type: Sequelize.TINYINT,
      allowNull: true
    },
    employment_status: {
      type: Sequelize.TINYINT,
      allowNull: true,
      defaultValue: 1
    },
    attendance_status: {
      type: Sequelize.TINYINT,
      allowNull: true,
      defaultValue: 1
    },
    education_status: {
      type: Sequelize.TINYINT,
      allowNull: true,
      defaultValue: 3
    }
  },
  merge(
    {
      tableName: 'employee',
      modelName: 'employee',
      sequelize
    },
    InfoCrudMixin.options
  )
);

export { Employee };
