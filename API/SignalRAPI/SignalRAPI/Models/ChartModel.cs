﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
using System.Threading.Tasks;

namespace SignalRAPI.Models
{
    public class ChartModel
    {
        public  List<int> Data { get; set; }
        public  string Label { get; set; }

        public ChartModel()
        {
            Data = new List<int>();
        }
    }
}
