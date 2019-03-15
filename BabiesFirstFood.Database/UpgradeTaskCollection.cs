using DbUp.Engine;
using System;
using System.Collections.Generic;

namespace BabiesFirstFood.Database
{
    public class UpgradeTaskCollection : List<IUpgradeTask>
    {
        public bool PerformUpgrade()
        {
            foreach (var task in this)
            {
                var engine = task.GetUpgradeTask();
                var result = engine.PerformUpgrade();
                if (!HandleResult(result))
                {
                    return false;
                }
            }

            return true;
        }

        private bool HandleResult(DatabaseUpgradeResult result)
        {
            if (!result.Successful)
            {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine(result.Error);
                Console.ResetColor();
            }

            return result.Successful;
        }
    }
}
