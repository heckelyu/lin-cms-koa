import { NotFound, Forbidden } from 'lin-mizar';
import { Legalentity } from '../model/legalentity';
import Sequelize from 'sequelize';

class LegalentityDao {
  async getLegalentity (id) {
    const legalentity = await Legalentity.findOne({
      where: {
        id
      }
    });
    return legalentity;
  }

  async getLegalentityByKeyword (q) {
    const legalentity = await Legalentity.findOne({
      where: {
        entity_name: {
          [Sequelize.Op.like]: `%${q}%`
        }
      }
    });
    return legalentity;
  }

  async getLegalentitys () {
    const legalentitys = await Legalentity.findAll();
    return legalentitys;
  }

  async createLegalentity (v) {
    const legalentity = await Legalentity.findOne({
      where: {
        entity_code: v.get('body.entity_code')
      }
    });
    if (legalentity) {
      throw new Forbidden({
        msg: '法人单位已存在'
      });
    }
    const bk = new Legalentity();
    bk.entity_code = v.get('body.entity_code');
    bk.entity_name = v.get('body.entity_name');
    bk.entity_abbr = v.get('body.entity_abbr');
    bk.forgz = v.get('body.forgz');
    bk.entity_level = v.get('body.entity_level');
    bk.attach_to = v.get('body.attach_to');
    bk.save();
  }

  async updateLegalentity (v, id) {
    const legalentity = await Legalentity.findByPk(id);
    if (!legalentity) {
      throw new NotFound({
        msg: '没有找到相关法人单位'
      });
    }

    legalentity.entity_code = v.get('body.entity_code');
    legalentity.entity_name = v.get('body.entity_name');
    legalentity.entity_abbr = v.get('body.entity_abbr');
    legalentity.forgz = v.get('body.forgz');
    legalentity.entity_level = v.get('body.entity_level');
    legalentity.attach_to = v.get('body.attach_to');

    legalentity.save();
  }

  async deleteLegalentity (id) {
    const legalentity = await Legalentity.findOne({
      where: {
        id
      }
    });
    if (!legalentity) {
      throw new NotFound({
        msg: '没有找到相关法人单位'
      });
    }
    legalentity.destroy();
  }
}

export { LegalentityDao };
