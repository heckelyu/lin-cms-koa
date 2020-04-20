import { NotFound, Forbidden } from 'lin-mizar';
import { Employee } from '../model/employee';
import Sequelize from 'sequelize';

class EmployeeDao {
  async getEmployee (id) {
    const employee = await Employee.findOne({
      where: {
        id
      }
    });
    return employee;
  }

  async getEmployeeByKeyword (q) {
    const employee = await Employee.findOne({
      where: {
        entity_code: {
          [Sequelize.Op.like]: `%${q}%`
        }
      }
    });
    return employee;
  }

  async getEmployees () {
    const employees = await Employee.findAll();
    return employees;
  }

  async createEmployee (v) {
    const employee = await Employee.findOne({
      where: {
        employee_name: v.get('body.employee_name'),
        employee_id: v.get('body.employee_id')
      }
    });
    if (employee) {
      throw new Forbidden({
        msg: '法人单位已存在'
      });
    }
    const bk = new Employee();
    bk.entity_code = v.get('body.entity_code');
    bk.entity_name = v.get('body.entity_name');
    bk.entity_abbr = v.get('body.entity_abbr');
    bk.forgz = v.get('body.forgz');
    bk.entity_level = v.get('body.entity_level');
    bk.attach_to = v.get('body.attach_to');
    bk.save();
  }

  async updateEmployee (v, id) {
    const employee = await Employee.findByPk(id);
    if (!employee) {
      throw new NotFound({
        msg: '没有找到相关法人单位'
      });
    }

    employee.entity_code = v.get('body.entity_code');
    employee.entity_name = v.get('body.entity_name');
    employee.entity_abbr = v.get('body.entity_abbr');
    employee.forgz = v.get('body.forgz');
    employee.entity_level = v.get('body.entity_level');
    employee.attach_to = v.get('body.attach_to');

    employee.save();
  }

  async deleteEmployee (id) {
    const employee = await Employee.findOne({
      where: {
        id
      }
    });
    if (!employee) {
      throw new NotFound({
        msg: '没有找到相关法人单位'
      });
    }
    employee.destroy();
  }
}

export { EmployeeDao };
