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
        asset_code: v.get('body.asset_code')   //这里的逻辑有问题，晚点改
      }
    });
    if (checkrecord) {
      throw new Forbidden({
        msg: '盘点记录已存在'
      });
    }
    const bk = new Checkrecord();
    bk.asset_code = v.get('body.asset_code');
    bk.entity_name = v.get('body.entity_name');
    bk.asset_status = v.get('body.asset_status');
    bk.check_note = v.get('body.check_note');
    bk.check_image_id = v.get('body.check_image_id');
    bk.check_date = v.get('body.check_date');
    bk.check_user_id = v.get('body.check_user_id');
    bk.save();
  }

  async updateCheckrecord (v, id) {
    const checkrecord = await Checkrecord.findByPk(id);
    if (!checkrecord) {
      throw new NotFound({
        msg: '没有找到相关盘点记录'
      });
    }

    checkrecord.asset_code = v.get('body.asset_code');
    checkrecord.entity_name = v.get('body.entity_name');
    checkrecord.asset_status = v.get('body.asset_status');
    checkrecord.check_note = v.get('body.check_note');
    checkrecord.check_image_id = v.get('body.check_image_id');
    checkrecord.check_date = v.get('body.check_date');
    checkrecord.check_user_id = v.get('body.check_user_id');

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
        msg: '没有找到相关盘点记录'
      });
    }
    checkrecord.destroy();
  }
}

export { CheckrecordDao };
