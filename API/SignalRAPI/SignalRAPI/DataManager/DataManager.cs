using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SignalRAPI.Models;

namespace SignalRAPI.DataManager
{
    public class DataManager
    {
        public static List<ChartModel> GetData()
        {
            var random = new  Random();
            return  new List<ChartModel>()
            {
                new ChartModel { Data = new List<int> { random.Next(1, 40) }, Label = "Data1" },
                new ChartModel { Data = new List<int> { random.Next(1, 40) }, Label = "Data2" },
                new ChartModel { Data = new List<int> { random.Next(1, 40) }, Label = "Data3" },
                new ChartModel { Data = new List<int> { random.Next(1, 40) }, Label = "Data4" }
            };
        }
    }
}
