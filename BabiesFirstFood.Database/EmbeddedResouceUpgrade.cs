using DbUp;
using DbUp.Engine;
using System.Reflection;

namespace BabiesFirstFood.Database
{
    public class EmbeddedResouceUpgrade : IUpgradeTask
    {
        private readonly string connectionString;
        private readonly Assembly assembly;

        public EmbeddedResouceUpgrade(string connectionString, Assembly assembly)
        {
            this.connectionString = connectionString;
            this.assembly = assembly;
        }

        public string Filter { get; set; }

        public IJournal Journal { get; set; }

        public bool WithTransaction { get; set; } = true;

        public UpgradeEngine GetUpgradeTask()
        {
            var upgrader = DeployChanges.To
                .SqlDatabase(connectionString);

            if (string.IsNullOrWhiteSpace(Filter))
            {
                upgrader = upgrader.WithScriptsEmbeddedInAssembly(assembly);
            }
            else
            {
                upgrader = upgrader.WithScriptsEmbeddedInAssembly(assembly, s => s.StartsWith(Filter));
            }

            if (Journal != null)
            {
                upgrader = upgrader.JournalTo(Journal);
            }

            if (WithTransaction)
            {
                upgrader = upgrader.WithTransaction();
            }

            var engine = upgrader
                .LogToConsole()
                .Build();

            return engine;
        }
    }
}
