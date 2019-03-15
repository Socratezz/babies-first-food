using DbUp.Engine;

namespace BabiesFirstFood.Database
{
    public interface IUpgradeTask
    {
        UpgradeEngine GetUpgradeTask();
    }
}
