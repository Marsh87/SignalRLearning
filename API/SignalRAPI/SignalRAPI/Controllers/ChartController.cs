﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SignalRAPI.Hubs;
using SignalRAPI.TimerFeatures;

namespace SignalRAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChartController : ControllerBase
    {
        private IHubContext<ChartHub> _hub;

        public ChartController(IHubContext<ChartHub> hub)
        {
            _hub = hub;
        }

        public IActionResult Get()
        {
            var timerManager = new TimerManager(() =>
                _hub.Clients.All.SendAsync("transferchartdata", DataManager.DataManager.GetData()));

            return Ok(new {Message = "Request Completed"});
        }
    }
}