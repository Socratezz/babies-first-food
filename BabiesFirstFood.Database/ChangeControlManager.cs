using DbUp.Helpers;
using System.Reflection;

namespace BabiesFirstFood.Database
{
    public class ChangeControlManager
    {
        private readonly IConnectionManager _connection;
        public ChangeControlManager()
            : this(new ConnectionManager())
        {

        }

        public ChangeControlManager(IConnectionManager connection)
        {
            _connection = connection;
        }

        public ChangeControlResult Execute()
        {
            if (!ChangeControl.PerformUpgrade(RegisterUpgrades))
            {
                return ChangeControlResult.FailureResult;
            }

            return ChangeControlResult.SuccessResult;
        }

        private void RegisterUpgrades(UpgradeTaskCollection config)
        {
            //Make sure the scripts are embedded resources
            if (_connection.BabiesFirstFoodConnection != null)
            {
                //Once and done scripts
                config.Add(new EmbeddedResouceUpgrade(_connection.BabiesFirstFoodConnection, Assembly.GetExecutingAssembly())
                {
                    Filter = "BabiesFirstFood.Database.Scripts.Tables"
                });
                //Always run scripts
                config.Add(new EmbeddedResouceUpgrade(_connection.BabiesFirstFoodConnection, Assembly.GetExecutingAssembly())
                {
                    Filter = "BabiesFirstFood.Database.Scripts.Types",
                    Journal = new NullJournal() //Adding this allows the script to be rerun
                });
                config.Add(new EmbeddedResouceUpgrade(_connection.BabiesFirstFoodConnection, Assembly.GetExecutingAssembly())
                {
                    Filter = "BabiesFirstFood.Database.Scripts.Views",
                    Journal = new NullJournal() //Adding this allows the script to be rerun
                });
                config.Add(new EmbeddedResouceUpgrade(_connection.BabiesFirstFoodConnection, Assembly.GetExecutingAssembly())
                {
                    Filter = "BabiesFirstFood.Database.Scripts.Functions",
                    Journal = new NullJournal()
                });
                config.Add(new EmbeddedResouceUpgrade(_connection.BabiesFirstFoodConnection, Assembly.GetExecutingAssembly())
                {
                    Filter = "BabiesFirstFood.Database.Scripts.StoredProcedures",
                    Journal = new NullJournal()
                });
            }
        }
    }
}
