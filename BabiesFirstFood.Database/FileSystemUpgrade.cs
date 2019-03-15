using DbUp;
using DbUp.Engine;
using System.Text;

namespace BabiesFirstFood.Database
{
    class FileSystemUpgrade : IUpgradeTask
    {
        private string connectionString;
        private string directoryPath;

        public FileSystemUpgrade(string connectionString, string directoryPath)
        {
            this.connectionString = connectionString;
            this.directoryPath = directoryPath;
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
                upgrader = upgrader.WithScriptsFromFileSystem(directoryPath, Encoding.UTF8);
            }
            else
            {
                upgrader = upgrader.WithScriptsFromFileSystem(directoryPath, s => s.StartsWith(Filter));
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
