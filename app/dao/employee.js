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
        employee_name: {
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
        employee_id: v.get('body.employee_id')
      }
    });
    if (employee) {
      throw new Forbidden({
        msg: '员工信息已存在'
      });
    }
    // employee_id: this.employee_id,
    // employee_name: this.employee_name,
    // entity_name: this.entity_name,
    // employee_position: this.employee_position,
    // gender: this.gender,
    // age: this.age,
    // employment_status: this.employment_status,
    // attendance_status: this.attendance_status,
    // education_status: this.education_status
    const bk = new Employee();
    bk.employee_id = v.get('body.employee_id');
    bk.employee_name = v.get('body.employee_name');
    bk.entity_name = v.get('body.entity_name');
    bk.employee_position = v.get('body.employee_position');
    bk.gender = v.get('body.gender');
    bk.age = v.get('body.age');
    bk.employment_status = v.get('body.employment_status');
    bk.attendance_status = v.get('body.attendance_status');
    bk.education_status = v.get('body.education_status');
    bk.save();
  }

  async updateEmployee (v, id) {
    const employee = await Employee.findByPk(id);
    if (!employee) {
      throw new NotFound({
        msg: '没有找到相关员工信息'
      });
    }

    employee.employee_id = v.get('body.employee_id');
    employee.employee_name = v.get('body.employee_name');
    employee.entity_name = v.get('body.entity_name');
    employee.employee_position = v.get('body.employee_position');
    employee.gender = v.get('body.gender');
    employee.age = v.get('body.age');
    employee.employment_status = v.get('body.employment_status');
    employee.attendance_status = v.get('body.attendance_status');
    employee.education_status = v.get('body.education_status');

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
        msg: '没有找到相关员工信息'
      });
    }
    employee.destroy();
  }
}

export { EmployeeDao };
