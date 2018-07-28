/**
 * Created by ChitSwe on 1/4/17.
 */

const PaginationHelper={
  getPagination:({page,pageSize,totalRows})=>{
    const hasMore = page * pageSize <totalRows;
    let totalPages = totalRows? totalRows/pageSize:0;
    totalPages = parseInt(totalPages);
    if(totalPages<1)
      totalPages = 0;
    if(totalRows%pageSize>0)
      totalPages++;
    return {
        page:page,
        currentPage:page,
        pageSize:pageSize,
        totalRows:totalRows,
        totalPages,
        hasMore
    };
  },
  getResult({db,baseQuery,attributes,page,pageSize,where,listKey,paranoid,include,order}){
      let offset = (page - 1) * pageSize;
      listKey = listKey? listKey : 'list';
      const query = baseQuery.findAll({limit:pageSize,offset:offset,where,attributes,paranoid,include,order});
      if(include)
        include = include.map(i=>{
          i.attributes=[];
          if(i.include)
            i.include = i.include.map(ii=>{
              ii.attributes=[];
              return ii;
            });
          return i;
        });
      const rowCountQuery = baseQuery.findAll({raw:true,where,attributes:[[db.sequelize.fn('COUNT',db.sequelize.col('*')),'totalRows']],paranoid,include});
      return Promise.all([query,rowCountQuery]).then((results)=>{
          const totalRows = results[1][0].totalRows;
          const hasMore = page * pageSize <totalRows;
          let totalPages = totalRows? totalRows/pageSize:0;
          totalPages = parseInt(totalPages);
          if(totalPages<1)
            totalPages = 0;
          if(totalRows%pageSize>0)
            totalPages++;
          return {
              page:page,
              currentPage:page,
              pageSize:pageSize,
              [listKey]:results[0],
              totalRows:totalRows,
              totalPages,
              hasMore
          };
      });
  },

  getResultWithPagination(param){
    return PaginationHelper.getResult(param).then((result)=>{
      let {page,pageSize,totalRows,totalPages,hasMore} = result;
      return {
        [param.listKey]:result[param.listKey],
        pagination:{
           page,
          pageSize,
          totalRows,
          totalPages,
          hasMore
        }
      };
    });
  }
};

export default PaginationHelper;