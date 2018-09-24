'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`
    DROP FUNCTION public.rootproductcategory(integer);
    
    CREATE OR REPLACE FUNCTION public.rootproductcategory(IN categoryid integer)
      RETURNS TABLE(id integer, "Name" character varying, "ImagePath" character varying, "createdAt" timestamp with time zone, "updatedAt" timestamp with time zone, "deletedAt" timestamp with time zone, "ParentCategoryId" integer, level integer) AS
    $BODY$
    
            BEGIN
            RETURN QUERY
            WITH RECURSIVE Parents("id","ParentCategoryId","level") AS (
          SELECT "ProductCategory"."id","ProductCategory"."ParentCategoryId",1 AS level 
          FROM "ProductCategory" WHERE "ProductCategory"."id"= categoryId
          UNION ALL
            SELECT "ProductCategory"."id","ProductCategory"."ParentCategoryId",Parents.level + 1 As level 
            FROM "ProductCategory" JOIN Parents ON Parents."ParentCategoryId"="ProductCategory"."id"
            )
    
            SELECT "ProductCategory"."id","ProductCategory"."Name","ProductCategory"."ImagePath","ProductCategory"."createdAt","ProductCategory"."updatedAt","ProductCategory"."deletedAt","ProductCategory"."ParentCategoryId",Parents."level" FROM Parents INNER JOIN "ProductCategory" ON "ProductCategory"."id" = Parents."id";
            END;
    $BODY$
      LANGUAGE plpgsql VOLATILE
      COST 100
      ROWS 1000;
    ALTER FUNCTION public.rootproductcategory(integer)
      OWNER TO postgres;    
    `)
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(`
    `);
  }
};
