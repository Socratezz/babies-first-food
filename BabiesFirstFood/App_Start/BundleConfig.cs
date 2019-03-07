using System.Web;
using System.Web.Optimization;

namespace BabiesFirstFood
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/babies-first-food").Include(
                        "~/asset/vendor.js",
                        "~/asset/babiesfirstfood.js"));

            bundles.Add(new StyleBundle("~/Content/style").Include(
                "~/asset/vendor.css",
                "~/Content/style.css"));

            BundleTable.EnableOptimizations = false;
        }
    }
}
