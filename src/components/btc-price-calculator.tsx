import { Repeat } from "@geist-ui/icons";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";

interface BtcPriceCalculatorProps {
  symbol: string;
  currency: string;
  btcPrice: number;
}

const BtcPriceCalculator: React.FC<BtcPriceCalculatorProps> = ({
  symbol,
  btcPrice,
  currency,
}) => {
  const [btcAmount, setBtcAmount] = useState<string>("1");
  const [currencyAmount, setCurrencyAmount] = useState<string>(
    currency === "usd"
      ? btcPrice.toLocaleString()
      : (btcPrice * 1300).toLocaleString()
  );

  const handleBtcChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      if (/^\d*\.?\d{0,8}$/.test(value) || value === "") {
        setBtcAmount(value);
        if (value === "") {
          setCurrencyAmount("");
        } else {
          const btc = parseFloat(value);
          const usdPrice = btc * btcPrice;
          if (currency === "krw") {
            const krwPrice = usdPrice * 1300;
            setCurrencyAmount(
              krwPrice.toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 8,
              })
            );
          } else {
            setCurrencyAmount(
              usdPrice.toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 8,
              })
            );
          }
        }
      }
    },
    [btcPrice, currency]
  );

  const handleCurrencyChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      if (/^(0|[1-9]\d*)(\.\d{0,8})?$/.test(value) || value === "") {
        setCurrencyAmount(value);
        if (value === "") {
          setBtcAmount("");
        } else {
          const currencyValue = parseFloat(value.replace(/,/g, ""));
          if (currency === "krw") {
            const usdValue = currencyValue / 1300;
            const btcValue = usdValue / btcPrice;
            setBtcAmount(btcValue.toFixed(8).toString());
          } else {
            const btcValue = currencyValue / btcPrice;
            setBtcAmount(btcValue.toFixed(8).toString());
          }
        }
      }
    },
    [btcPrice, currency]
  );

  useEffect(() => {
    setCurrencyAmount(
      currency === "usd" ? btcPrice.toString() : (btcPrice * 1300).toString()
    );
    setBtcAmount("1");
  }, [currency]);

  return (
    <div className="w-full bg-[#f9f9f9] rounded-lg shadow-md p-4">
      <h1 className="text-sm font-bold">가격 계산</h1>

      <div className="flex justify-center items-center gap-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-row gap-2 items-center">
            <p className="font-bold text-xs">{symbol}</p>

            <input
              className="text-xs shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-black rounded-lg focus:border-transparent text-right"
              type="text"
              value={btcAmount}
              onChange={handleBtcChange}
            />
          </div>

          <Repeat size={18} color="#17BF63" />

          <div className="flex flex-row gap-2 items-center">
            <p className="font-bold text-xs">{currency.toUpperCase()}</p>
            <input
              className="text-xs shadow appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-black rounded-lg focus:border-transparent text-right"
              type="text"
              value={currencyAmount.toLocaleString()}
              onChange={handleCurrencyChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BtcPriceCalculator;
