import { NotFound, Forbidden } from 'lin-mizar';
import { Checkrecord } from '../model/checkrecord';
import Sequelize from 'sequelize';

class CheckrecordDao {
  async getCheckrecord (id) {
    const checkrecord = await Checkrecord.findOne({
      where: {
        id
      }
    });
    return checkrecord;
  }

  async getCheckrecordByKeyword (q) {
    const checkrecord = await Checkrecord.findOne({
      where: {
        entity_name: {
          [Sequelize.Op.like]: `%${q}%`
        }
      }
    });
    return checkrecord;
  }

  async getCheckrecords () {
    const checkrecords = await Checkrecord.findAll();
    return checkrecords;
  }

  async createCheckrecord (v) {
    const checkrecord = await Checkrecord.findOne({
      where: {
        entity_code: v.get('body.entity_code')
      }
    });
    if (checkrecord) {
      throw new Forbidden({
        msg: '法人单位已存在'
      });
    }
    const bk = new Checkrecord();
    bk.entity_code = v.get('body.entity_code');
    bk.entity_name = v.get('body.entity_name');
    bk.entity_abbr = v.get('body.entity_abbr');
    bk.forgz = v.get('body.forgz');
    bk.entity_level = v.get('body.entity_level');
    bk.attach_to = v.get('body.attach_to');
    bk.save();
  }

  async updateCheckrecord (v, id) {
    const checkrecord = await Checkrecord.findByPk(id);
    if (!checkrecord) {
      throw new NotFound({
        msg: '没有找到相关法人单位'
      });
    }

    checkrecord.entity_code = v.get('body.entity_code');
    checkrecord.entity_name = v.get('body.entity_name');
    checkrecord.entity_abbr = v.get('body.entity_abbr');
    checkrecord.forgz = v.get('body.forgz');
    checkrecord.entity_level = v.get('body.entity_level');
    checkrecord.attach_to = v.get('body.attach_to');

    checkrecord.save();
  }

  async deleteCheckrecord (id) {
    const checkrecord = await Checkrecord.findOne({
      where: {
        id
      }
    });
    if (!checkrecord) {
      throw new NotFound({
        msg: '没有找到相关法人单位'
      });
    }
    checkrecord.destroy();
  }
}

export { CheckrecordDao };
