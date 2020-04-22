import { NotFound, Forbidden } from 'lin-mizar';
import { Category } from '../model/category';
import Sequelize from 'sequelize';

class CategoryDao {
  async getCategory (id) {
    const category = await Category.findOne({
      where: {
        id
      }
    });
    return category;
  }

  async getCategoryByKeyword (q) {
    const category = await Category.findOne({
      where: {
        name: {
          [Sequelize.Op.like]: `%${q}%`
        }
      }
    });
    return category;
  }

  async getCategorys () {
    const categorys = await Category.findAll();
    return categorys;
  }

  async createCategory (v) {
    const category = await Category.findOne({
      where: {
        code: v.get('body.code')
      }
    });
    if (category) {
      throw new Forbidden({
        msg: '实物类别已存在'
      });
    }
    const bk = new Category();
    bk.code = v.get('body.code');
    bk.name = v.get('body.name');
    bk.value = v.get('body.value');
    bk.flag = v.get('body.flag');
    bk.note = v.get('body.note');
    bk.save();
  }

  async updateCategory (v, id) {
    const category = await Category.findByPk(id);
    if (!category) {
      throw new NotFound({
        msg: '没有找到相关实物类别'
      });
    }

    category.code = v.get('body.code');
    category.name = v.get('body.name');
    category.value = v.get('body.value');
    category.flag = v.get('body.flag');
    category.note = v.get('body.note');

    category.save();
  }

  async deleteCategory (id) {
    const category = await Category.findOne({
      where: {
        id
      }
    });
    if (!category) {
      throw new NotFound({
        msg: '没有找到相关实物类别'
      });
    }
    category.destroy();
  }
}

export { CategoryDao };
