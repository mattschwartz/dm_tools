using System.Collections.Generic;

public class CurrencyModel
{
    private static Dictionary<CurrencyType, double> _copperWorthByType = new Dictionary<CurrencyType, double>()
    {
        [CurrencyType.Copper] = 1,
        [CurrencyType.Silver] = 10,
        [CurrencyType.Electrum] = 50,
        [CurrencyType.Gold] = 100,
        [CurrencyType.Platinum] = 1000
    };

    private Dictionary<CurrencyType, double> _currency;

    public double Copper { get => _currency[CurrencyType.Copper]; }
    public double Silver { get => _currency[CurrencyType.Silver]; }
    public double Electrum { get => _currency[CurrencyType.Electrum]; }
    public double Gold { get => _currency[CurrencyType.Gold]; }
    public double Platinum { get => _currency[CurrencyType.Platinum]; }

    public CurrencyModel(double copper = 0, double silver = 0, double electrum = 0, double gold = 0, double platinum = 0)
    {
        _currency = new Dictionary<CurrencyType, double>()
        {
            [CurrencyType.Copper] = copper,
            [CurrencyType.Silver] = silver,
            [CurrencyType.Electrum] = electrum,
            [CurrencyType.Gold] = gold,
            [CurrencyType.Platinum] = platinum,
        };
    }

    public override string ToString()
    {
        string result = "";
        if (Platinum != 0) {
            result += Platinum.ToString("n0") + "pp ";
        }
        if (Gold != 0) {
            result += Gold.ToString("n0") + "gp ";
        }
        if (Electrum != 0) {
            result += Electrum.ToString("n0") + "ep ";
        }
        if (Silver != 0) {
            result += Silver.ToString("n0") + "sp ";
        }
        if (Copper != 0) {
            result += Copper.ToString("n0") + "cp ";
        }
        
        return result;
    }

    public static CurrencyModel operator +(CurrencyModel lhs, CurrencyModel rhs) => new CurrencyModel(
        lhs.Copper + rhs.Copper,
        lhs.Silver + rhs.Silver,
        lhs.Electrum + rhs.Electrum,
        lhs.Gold + rhs.Gold,
        lhs.Platinum + rhs.Platinum);

    public double GetCurrency(CurrencyType type)
    {
        return _currency[type];
    }

    public static double Exchange(CurrencyType from, CurrencyType to, double amount)
    {
        double amountInCopper = amount * _copperWorthByType[from];

        double exchangeRate = 1.0 / _copperWorthByType[to];

        return amountInCopper * exchangeRate;
    }

    public static CurrencyType? FromString(string str)
    {
        if (str.ToLower() == CurrencyType.Copper.ToString().ToLower() || str.ToLower() == "cp")
        {
            return CurrencyType.Copper;
        }
        if (str.ToLower() == CurrencyType.Silver.ToString().ToLower() || str.ToLower() == "sp")
        {
            return CurrencyType.Silver;
        }
        if (str.ToLower() == CurrencyType.Electrum.ToString().ToLower() || str.ToLower() == "ep")
        {
            return CurrencyType.Electrum;
        }
        if (str.ToLower() == CurrencyType.Gold.ToString().ToLower() || str.ToLower() == "gp")
        {
            return CurrencyType.Gold;
        }
        if (str.ToLower() == CurrencyType.Platinum.ToString().ToLower() || str.ToLower() == "pp")
        {
            return CurrencyType.Platinum;
        }

        return null;
    }
}
