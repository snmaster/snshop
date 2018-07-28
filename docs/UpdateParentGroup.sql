UPDATE "ProductGroup"
SET "ParentGroupId" = GroupId
FROM
(

SELECT trunc(random() * 89 +1) AS GroupId,id FROM "ProductGroup" WHERE id<=90
) AS T
WHERE T.GroupId <> T.id AND T.id="ProductGroup"."id";

SELECT * FROM "ProductGroup"



