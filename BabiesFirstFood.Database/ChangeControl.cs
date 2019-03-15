using System;

namespace BabiesFirstFood.Database
{
    public class ChangeControl
    {
        public static bool PerformUpgrade(Action<UpgradeTaskCollection> register)
        {
            var collection = new UpgradeTaskCollection();
            register(collection);

            return collection.PerformUpgrade();
        }
    }
}
