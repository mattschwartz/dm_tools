using System;
using commands;

namespace cli
{
    class Program
    {
        static void Main(string[] args)
        {
            var treasureSum = new CurrencyModel(
                copper: 0,
                silver: 0,
                electrum: 190,
                gold: 130,
                platinum: 15);

            int numPlayers = 4;
            var newSum = CurrencyBalancer.Distribute(treasureSum, numPlayers);

            Console.WriteLine("Normalized Values:");

            Console.WriteLine(FormatCurrency(newSum.Platinum, numPlayers, "pp") + " " +
                FormatCurrency(newSum.Gold, numPlayers, "gp") + " " +
                FormatCurrency(newSum.Electrum, numPlayers, "ep") + " " +
                FormatCurrency(newSum.Silver, numPlayers, "sp") + " " +
                FormatCurrency(newSum.Copper, numPlayers, "cp"));

            // while (true)
            // {
            //     Console.WriteLine("==========================\n\nEnter {AMOUNT} {FROM} to {TO}}");
            //     string line = Console.ReadLine();

            //     string[] parts = line.Split(" ");
            //     double amount = double.Parse(parts[0]);

            //     CurrencyType from = CurrencyModel.FromString(parts[1]) ?? throw new Exception("No valid type=" + parts[1]);
            //     CurrencyType to = CurrencyModel.FromString(parts[3]) ?? throw new Exception("No valid type=" + parts[3]);

            //     Console.WriteLine("\n==========================\n{0:n}x {1} = {2:n}x {3}", amount, from, CurrencyModel.Exchange(from, to, amount), to);
            // }
        }

        private static string FormatCurrency(double amount, int numPlayers, string shorthand)
        {
            if (amount == 0) {
                return "";
            }

            int each = (int)amount / numPlayers;

            return $"{amount:n0} ({each:n0}) {shorthand} ";
        }
    }
}
