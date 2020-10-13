using System;

namespace commands
{
    public static class CurrencyBalancer
    {
        public static CurrencyModel Distribute(CurrencyModel sum, int numPlayers) {
            return new CurrencyModel(
                copper: Normalize((int)sum.Copper, numPlayers),
                silver: Normalize((int)sum.Silver, numPlayers),
                electrum: Normalize((int)sum.Electrum, numPlayers),
                gold: Normalize((int)sum.Gold, numPlayers),
                platinum: Normalize((int)sum.Platinum, numPlayers));
        }

        private static int Normalize(int value, int numPlayers) {
            if (value % numPlayers == 0) {
                return value;
            }

            int nearestAbove = NormalizeHelper(value, 1, numPlayers);
            int nearestBelow = NormalizeHelper(value, -1, numPlayers);

            if (Math.Abs(value - nearestAbove) < Math.Abs(value - nearestBelow)) {
                return nearestAbove;
            } else {
                return nearestBelow;
            }
        }

        private static int NormalizeHelper(int value, int mod, int numPlayers) {
            if (value < 0 || value % numPlayers == 0) {
                return value;
            }

            return NormalizeHelper(value + mod, mod, numPlayers);
        }
    }
}
