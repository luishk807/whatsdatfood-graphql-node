import Base from './base.repository';
import db from '../db/models/index';

import { UserInput } from '../db/models/users';
import Users from '../db/models/users';
import { includes } from 'lodash';
import { dbAliases } from 'db';

class UsersRepo extends Base {
  constructor() {
    super(Users);
  }

  async findUserBy(
    key: 'email' | 'username',
    value: string,
  ): Promise<Users | null> {
    const findUser = await this.model.findOne({
      where: {
        [key]: value,
      },
      include: [
        {
          model: db.UserRoles,
          as: dbAliases.users.userRole,
        },
        {
          model: db.UserSearches,
          as: dbAliases.users.userSearches,
          include: [
            {
              model: db.Users,
              as: dbAliases.userSearches.user,
            },
            {
              model: db.Restaurants,
              as: dbAliases.userSearches.restaurant,
            },
          ],
        },
        {
          model: db.UserFriends,
          as: dbAliases.users.friends,
          include: [
            {
              model: db.Users,
              as: dbAliases.userFriends.user,
            },
          ],
        },
        {
          model: db.UserRatings,
          as: dbAliases.users.userRatings,
          include: [
            {
              model: db.RestaurantMenuItems,
              as: dbAliases.userRatings.restaurantItem,
              include: [
                {
                  model: db.Restaurants,
                  as: dbAliases.restaurantItems.restaurant,
                },
              ],
            },
          ],
        },
        {
          model: db.Statuses,
          as: dbAliases.users.status,
        },
      ],
    });
    // console.log(JSON.stringify(findUser, null, 2)); // Check nested data here

    return findUser ? findUser : null;
  }
}

export default UsersRepo;
