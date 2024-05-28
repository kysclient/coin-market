import React, { useEffect, useState } from "react";
import { CoinData } from "../../types/coin";
import {
  calculatePriceChange,
  capitalizeFirstLetter,
  formatBitcoinPrice,
  toggleBookmark,
} from "../utills";
import { useNavigate } from "react-router-dom";
import { Spinner, useToasts } from "@geist-ui/core";
import { Heart, HeartFill } from "@geist-ui/icons";

interface MarketTableProps {
  data: CoinData[];
  currency: string;
  isShowMoreLoading: boolean;
  fetchMore?: () => void;
  removeBookmark?: (coinData: CoinData) => void;
}

const MarketTable: React.FC<MarketTableProps> = ({
  data,
  currency,
  isShowMoreLoading,
  fetchMore,
  removeBookmark,
}) => {
  const [bookmarks, setBookmarks] = useState<CoinData[]>([]);
  const navigate = useNavigate();
  const { setToast } = useToasts();

  const showMessage = (message: string) =>
    setToast({ text: message, delay: 2000, type: "success" });

  const handleToggleBoorkmark = (coinData: CoinData): void => {
    toggleBookmark(
      coinData,
      bookmarks,
      setBookmarks,
      showMessage,
      removeBookmark
    );
  };
  useEffect(() => {
    const bookmarksData: string | null = localStorage.getItem("bookmarks");
    if (bookmarksData) {
      setBookmarks(JSON.parse(bookmarksData));
    }
  }, []);

  return (
    <>
      <table className="w-full animate-fade-in">
        <thead className="bg-[#f9f9f9] rounded-xl text-xs md:text-sm">
          <tr className="">
            <th align="center" className="p-4" />
            <th align="center" className="p-4">
              자산
            </th>
            <th align="center" className="p-4">
              Symbol
            </th>
            <th align="center" className="p-4">
              Price
            </th>
            <th align="center" className="p-4">
              1H
            </th>
            <th align="center" className="p-4">
              24H
            </th>
            <th align="center" className="p-4">
              7D
            </th>
            <th align="center" className="p-4">
              24H Volume
            </th>
          </tr>
        </thead>
        <tbody className="text-xs md:text-sm">
          {data.length > 0 ? (
            data.map((market, idx) => (
              <tr
                className="border-b border-zinc-200 hover:bg-[#f9f9f9]/90 transition duration-200"
                key={market.symbol}
              >
                <td align="center" className="p-4 cursor-pointer">
                  <button
                    onClick={() => {
                      handleToggleBoorkmark(market);
                    }}
                    className="p-1 rounded-full  items-center"
                  >
                    {bookmarks.find(
                      (bookmark) => bookmark.symbol === market.symbol
                    ) ? (
                      <HeartFill color="#FF0000" size={20} />
                    ) : (
                      <Heart color="#1c1c1f" />
                    )}
                  </button>
                </td>
                <td
                  onClick={() => {
                    navigate(`/market/${market.id}`, {
                      state: { coin: market },
                    });
                  }}
                  className="cursor-pointer p-4 flex flex-row items-center justify-center space-x-2"
                  align="center"
                >
                  <img src={market.image} className="w-[25px]" />
                  <p>{capitalizeFirstLetter(market.id)}</p>
                </td>
                <td align="center" className="p-4">
                  {market.symbol.toUpperCase()}
                </td>
                <td align="center" className="p-4">
                  {formatBitcoinPrice(market.current_price, currency)}
                </td>
                <td align="center" className="p-4">
                  <p
                    className={`${
                      calculatePriceChange(
                        market.price_change_percentage_1h_in_currency
                      ).flag
                        ? "text-[#FF5722]"
                        : "text-[#0070F3]"
                    }`}
                  >
                    {
                      calculatePriceChange(
                        market.price_change_percentage_1h_in_currency
                      ).value
                    }
                  </p>
                </td>
                <td align="center" className="p-4">
                  <p
                    className={`${
                      calculatePriceChange(
                        market.price_change_percentage_24h_in_currency
                      ).flag
                        ? "text-[#FF5722]"
                        : "text-[#0070F3]"
                    }`}
                  >
                    {
                      calculatePriceChange(
                        market.price_change_percentage_24h_in_currency
                      ).value
                    }
                  </p>
                </td>
                <td align="center" className="p-4">
                  <p
                    className={`${
                      calculatePriceChange(
                        market.price_change_percentage_7d_in_currency
                      ).flag
                        ? "text-[#FF5722]"
                        : "text-[#0070F3]"
                    }`}
                  >
                    {
                      calculatePriceChange(
                        market.price_change_percentage_7d_in_currency
                      ).value
                    }
                  </p>
                </td>
                <td align="center" className="p-4">
                  {formatBitcoinPrice(market.total_volume, currency)}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={9} align="center" className="h-96">
                <div className="flex justify-center items-center h-full">
                  <p className="p-4 text-center">마켓 정보가 없습니다.</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {fetchMore ? (
        <div className="animate-fade-in w-full flex justify-center items-center">
          {isShowMoreLoading ? (
            <Spinner className="text-white" color="#fff" />
          ) : (
            <button
              onClick={fetchMore}
              className="flex justify-center items-center text-white w-full py-2 md:py-4 rounded-xl bg-black transition duration-200 hover:bg-black/80"
            >
              <p className="text-center text-xs md:text-md">더보기</p>
            </button>
          )}
        </div>
      ) : null}
    </>
  );
};

export default React.memo(MarketTable);
