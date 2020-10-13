import { CurrencyModel } from "../data/CurrencyModel"
import { constructUri } from './base';

export interface BalanceCurrencyResponse {

}

export const BalanceCurrency = async (args: CurrencyModel): CurrencyModel => {
    const uri: string = constructUri('currency/balance');

    const res = await fetch(uri, { method: 'POST', body: JSON.stringify(args) });

    return (await res.json());
}
