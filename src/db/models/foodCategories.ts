import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from 'db/sequelize';
import { dbAliases } from 'db/index';
interface FoodCategoriesInterface {
  id: number;
  name: string;
  status_id: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export interface FoodCategoriesInput
  extends Optional<FoodCategoriesInterface, 'id'> {}
export interface FoodCategoriesOutput
  extends Required<FoodCategoriesInterface> {}

class FoodCategories
  extends Model<FoodCategoriesInterface, FoodCategoriesInput>
  implements FoodCategoriesInterface
{
  public id!: number;
  public name!: string;
  public status_id!: number;

  // timestamps!
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
  public readonly deleted_at!: Date;

  static associate(models: any): void {
    FoodCategories.belongsTo(models.Statuses, {
      foreignKey: 'status_id',
      as: dbAliases.foodCategories.status,
    });
  }
}

FoodCategories.init(
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER.UNSIGNED,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    status_id: {
      type: DataTypes.BIGINT,
      defaultValue: 1,
      references: {
        model: 'statuses',
        key: 'id',
      },
      onDelete: 'SET NULL',
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
    paranoid: true,
    underscored: true,
  },
);

export default FoodCategories;
