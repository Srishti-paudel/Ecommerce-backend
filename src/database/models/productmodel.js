const productModel =(sequelize,DataTypes)=>{
    const Product= sequelize.define("product",{
         productName :{
         type: DataTypes.STRING,
         allowNull: false
         },
         productDescription:{
             type: DataTypes.TEXT,
             allowNull: false
             },
          productPrice:{
                 type: DataTypes.FLOAT,
                 allowNull: false
                 },
           productStock:{
                 type: DataTypes.INTEGER,
                 allowNull: false
                 },
            discount :{
                 type: DataTypes.INTEGER,
                 allowNull: false
                 },
            productImage :{
                 type: DataTypes.STRING,
                 allowNull: false
                 }
    
     })
 return Product
 }
 export default productModel
 