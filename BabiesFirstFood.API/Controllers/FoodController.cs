using Dapper;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web.Http;

namespace BabiesFirstFood.API.Controllers
{
    [RoutePrefix("food")]
    public class FoodController : ApiController
    {
        [Route("new")]
        [AcceptVerbs("POST")]
        public IHttpActionResult AddFood(IEnumerable<FoodInsert> data)
        {
            foreach (var d in data)
            {
                var connection = ConfigurationManager.ConnectionStrings["BabiesFirstFoodConnection"].ConnectionString;
                var parameters = new DynamicParameters();
                parameters.Add("@Date", d.Date.Date);
                parameters.Add("@Food", d.Food);
                using (IDbConnection conn = new SqlConnection(connection))
                {
                    conn.Execute("dbo.InsertBabyFood", parameters, commandType: CommandType.StoredProcedure);
                }
            }
            
            return Ok();
        }

        [Route("get")]
        [AcceptVerbs("POST")]
        public IHttpActionResult GetFood(FoodFetch data)
        {
            var connection = ConfigurationManager.ConnectionStrings["BabiesFirstFoodConnection"].ConnectionString;
            var parameters = new DynamicParameters();
            parameters.Add("@StartDate", data.StartDate);
            parameters.Add("@EndDate", data.EndDate);
            var vm = new List<FoodInsert>();
            using (IDbConnection conn = new SqlConnection(connection))
            {
                vm = conn.Query<FoodInsert>("dbo.GetBabyFood", parameters, commandType: CommandType.StoredProcedure).ToList();
            }
            return Ok(vm);
        }
    }

    public class FoodInsert
    {
        public DateTime Date { get; set; }
        public string Food { get; set; }
    }

    public class FoodFetch
    {
        public DateTime? StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
