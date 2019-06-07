using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace SignalRAPI.Models
{
    public class GraphModel
    {
        public List<ChartModel> YData { get; set; }
        public  List<int> XData {get; set; }
    }
}
