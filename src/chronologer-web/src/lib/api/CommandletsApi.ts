import { CurrencyModel } from "../data/CurrencyModel"
import { constructUri } from './base';

export const BalanceCurrency = async (args: CurrencyModel): Promise<CurrencyModel> => {
    const uri: string = constructUri('currency/balance');

    const res = await fetch(uri, { method: 'POST', body: JSON.stringify(args) });

    return res.json();
}
