using System;

namespace BabiesFirstFood.API.Models
{
    public class CalendarData
    {
        public DateTime Date { get; set; }
        public int Day { get; set; }
        public bool CurrentMonth { get; set; }
        public bool CurrentDay { get; set; }
        public string Food { get; set; }
    }
}