using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SignalRAPI.Models;

namespace SignalRAPI.DataManager
{
    public class DataManager
    {
        public static GraphModel GetData()
        {
            return new  GraphModel()
            {
                YData = CreateChartModelYData(),
                XData = CreateChartModelXData()
            };

        }

        private static List<ChartModel> CreateChartModelYData()
        {
            var random = new Random();
            return new List<ChartModel>()
            {
                new ChartModel {Data = new List<int> {random.Next(1, 40), random.Next(1, 40), random.Next(1, 40), random.Next(1, 40)}, Label = "Data1"},
            };
        }
        private static List<int> CreateChartModelXData()
        {
            return new List<int> {DateTime.Now.Second, DateTime.Now.Second+1 , DateTime.Now.Second+2 , DateTime.Now.Second+3 };

        }
    }
}
