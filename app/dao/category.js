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
        sub_name: {
          [Sequelize.Op.like]: `%${q}%`
        }
      }
    });
    return category;
  }

  async getCategoryByType (qType) {
    const category = await Category.findAll({
      where: {
        category_type: qType
      }
    });
    console.log(category);
    return category;
  }

  async getCategorys () {
    const categorys = await Category.findAll();
    return categorys;
  }

  async createCategory (v) {
    const category = await Category.findOne({
      where: {
        category_type: v.get('body.category_type'),
        sub_code: v.get('body.sub_code')
      }
    });
    if (category) {
      throw new Forbidden({
        msg: '类别已存在'
      });
    }
    const bk = new Category();
    bk.category_type = v.get('body.category_type');
    bk.category_name = v.get('body.category_name');
    bk.sub_code = v.get('body.sub_code');
    bk.sub_name = v.get('body.sub_name');
    bk.sub_value = v.get('body.sub_value');
    bk.sub_flag = v.get('body.sub_flag');
    bk.sub_note = v.get('body.sub_note');

    bk.save();
  }

  async updateCategory (v, id) {
    const category = await Category.findByPk(id);
    if (!category) {
      throw new NotFound({
        msg: '没有找到相关实物类别'
      });
    }

    category.category_type = v.get('body.category_type');
    category.category_name = v.get('body.category_name');
    category.sub_code = v.get('body.sub_code');
    category.sub_name = v.get('body.sub_name');
    category.sub_value = v.get('body.sub_value');
    category.sub_flag = v.get('body.sub_flag');
    category.sub_note = v.get('body.sub_note');

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
        msg: '没有找到相关类别'
      });
    }
    category.destroy();
  }
}

export { CategoryDao };
