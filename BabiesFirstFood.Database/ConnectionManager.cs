using System.Configuration;

namespace BabiesFirstFood.Database
{
    public interface IConnectionManager
    {
        string BabiesFirstFoodConnection { get; }
    }
    public class ConnectionManager : IConnectionManager
    {
        public string BabiesFirstFoodConnection
        {
            get
            {
                return ConfigurationManager.ConnectionStrings["BabiesFirstFoodConnection"].ConnectionString;
            }
        }
    }
}
