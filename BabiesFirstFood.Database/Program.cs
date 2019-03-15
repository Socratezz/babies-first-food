using System;

namespace BabiesFirstFood.Database
{
    class Program
    {
        static int Main(string[] args)
        {
            try
            {
                var manager = new ChangeControlManager();
                var result = manager.Execute();
                Console.Read();
                return result.Success ? 0 : 1;
            }
            catch (Exception e)
            {
                var ex = e;
                while (ex != null)
                {
                    Console.WriteLine("Message: " + e.Message);
                    if (!string.IsNullOrWhiteSpace(e.StackTrace))
                        Console.WriteLine(e.StackTrace);
                    Console.WriteLine();
                    ex = ex.InnerException;
                }
                return 2;
            }
        }
    }
}
