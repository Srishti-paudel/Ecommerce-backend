const CategoryModel =(sequelize,DataTypes)=>{
    const Category= sequelize.define("product",{
         id:{
         type: DataTypes.INTEGER,
          primaryKey: true,
         allowNull: false
         },
         categoryName:{
             type: DataTypes.TEXT,
             allowNull: false
             }
    
     })
 return Category
 }
 export default CategoryModel
 