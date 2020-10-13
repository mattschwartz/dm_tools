using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Chronologer.Api;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Chronologer.Controllers
{
    [ApiController]
    [Route("currency")]
    public class CurrencyApiController : ControllerBase
    {
        private readonly ILogger _logger;

        public CurrencyApiController(ILogger logger)
        {
            _logger = logger;
        }

        // GET: /currency/balance
        [HttpPost]
        [Route("balance")]
        public BalanceCurrencyResponse BalanceCurrency(BalanceCurrencyRequest args)
        {
            _logger.LogInformation("Received request for currency/balance {0}", args);

            return new BalanceCurrencyResponse
            {
                Platinum = 393,
                Gold = 1,
                Electrum = 99,
                Silver = 149,
                Copper = 4,
            };
        }
    }
}
