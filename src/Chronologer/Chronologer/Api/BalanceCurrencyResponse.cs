using System;
namespace Chronologer.Api
{
    public class BalanceCurrencyResponse
    {
        public int Platinum { get; set; }
        public int Gold { get;  set; }
        public int Electrum { get; set; }
        public int Silver { get; set; }
        public int Copper { get; set; }

        public BalanceCurrencyResponse()
        {
        }
    }
}
