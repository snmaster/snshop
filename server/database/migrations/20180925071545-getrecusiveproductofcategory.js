'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION public.getrecusiveproductofcategory(IN categoryId integer)
          RETURNS TABLE(id integer, "Alias" character varying, "Name" character varying, "Price" numeric, "Description" character varying, "createdAt" timestamp with time zone, "updatedAt" timestamp with time zone, "deletedAt" timestamp with time zone, "ImagePath" character varying, "ProductBrandId" integer,"ProductCategoryId" integer, "UOMId" integer,"SupplierId" integer,"OrderedQty" integer,"ReservedQty" integer,"MaxOrderQty" integer, "ActualBalance" integer) AS
        $BODY$
        
              BEGIN
              RETURN QUERY 
              WITH RECURSIVE nodes(id) AS (
            SELECT categoryId
            UNION
                SELECT s1."id"
                FROM "ProductCategory" s1 WHERE ("ParentCategoryId" IS NULL  AND categoryId IS NULL) OR ("ParentCategoryId" = categoryId)
                    UNION
                SELECT s2."id"
                FROM "ProductCategory" s2, nodes s1 WHERE s2."ParentCategoryId" = s1.id
            )
            SELECT DISTINCT "Product"."id","Product"."Alias","Product"."Name","Product"."Price","Product"."Description","Product"."createdAt","Product"."updatedAt","Product"."deletedAt","Product"."ImagePath","Product"."ProductBrandId","Product"."ProductCategoryId","Product"."UOMId","Product"."SupplierId","Product"."OrderedQty","Product"."ReservedQty","Product"."MaxOrderQty","Product"."ActualBalance" FROM nodes 
            INNER JOIN "Product" ON  "Product"."ProductCategoryId" = nodes."id";
        
            END; 
        
        $BODY$
          LANGUAGE plpgsql VOLATILE
          COST 100
          ROWS 1000;
        ALTER FUNCTION public.getrecusiveproductofcategory(integer)
          OWNER TO postgres;
    `);
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`
      DROP FUNCTION public.getrecusiveproductofcategory(integer);
    `);
  }
};
