import { dbAliases } from 'db';
import { _get } from 'helpers';
import { FoodCategory } from 'interfaces/foodCategory';
import { DEFAULT_STATUS } from 'constants/sequelize';

export const buildFoodCategoryPayload = (item: string) => {
  if (!item) {
    return null;
  }

  return {
    name: item.trim().toLowerCase(),
    status_id: DEFAULT_STATUS,
  };
};

export const buildFoodCategoryResponse = (
  item: FoodCategory | FoodCategory[],
) => {
  if (!item || (Array.isArray(item) && !item.length)) {
    return null;
  }

  if (Array.isArray(item)) {
    return item.map((foodCategory) => ({
      ...foodCategory,
      status: _get(foodCategory, dbAliases.foodCategories.status),
    }));
  }

  return {
    ...item,
    status: _get(item, dbAliases.foodCategories.status),
  };
};
