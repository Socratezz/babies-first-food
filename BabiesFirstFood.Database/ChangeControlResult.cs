namespace BabiesFirstFood.Database
{
    public class ChangeControlResult
    {
        public static ChangeControlResult SuccessResult
        {
            get { return new ChangeControlResult { Success = true }; }
        }

        public static ChangeControlResult FailureResult
        {
            get { return new ChangeControlResult { Success = false }; }
        }

        public bool Success { get; private set; }
    }
}
