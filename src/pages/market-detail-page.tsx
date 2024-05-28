import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { apiRequest } from "../services/apis";
import { CoinData, CoinDetail } from "../../types/coin";
import { Select, Spinner, useToasts } from "@geist-ui/core";
import {
  calculatePriceChange,
  formatBitcoinPrice,
  toggleBookmark,
} from "../utills";
import { ChevronDown, ChevronUp, Heart, HeartFill } from "@geist-ui/icons";
import BtcPriceCalculator from "../components/btc-price-calculator";

interface RouteParams {
  id: string;
}

const MarketDetailPage: React.FC = () => {
  const params = useParams<keyof RouteParams>() as RouteParams;
  const location = useLocation();
  const [currency, setCurrency] = useState<string>("krw");
  const state = location.state as { coin: CoinData };
  const [marketDetail, setMarketDetail] = useState<CoinDetail>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [bookmarks, setBookmarks] = useState<CoinData[]>([]);
  const [showMore, setShowMore] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const { setToast } = useToasts();
  const showMessage = (message: string) =>
    setToast({ text: message, delay: 2000, type: "success" });

  const fetchDetail = async () => {
    setIsLoading(true);
    setIsError(false);
    const response = await apiRequest.coins.geDetail(params.id);
    if (response.success) {
      const detailData: any = response.result;
      setMarketDetail(detailData);
    } else {
      setIsError(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (params.id) {
      fetchDetail();
    }
    const bookmarksData: string | null = localStorage.getItem("bookmarks");
    if (bookmarksData) {
      setBookmarks(JSON.parse(bookmarksData));
    }
  }, []);

  const handleToggleBoorkmark = (coinData: CoinData): void => {
    toggleBookmark(coinData, bookmarks, setBookmarks, showMessage);
  };

  return (
    <section className="max-w-3xl mx-auto">
      {isLoading ? (
        <div className="flex flex-col justify-center items-center py-8">
          <Spinner scale={2} />
        </div>
      ) : (
        <>
          {marketDetail ? (
            <div className="animate-fade-in w-full p-4 space-y-4">
              <div className="flex flex-col md:flex-row md:justify-between gap-4 items-center">
                <div className="flex flex-row gap-1 items-center">
                  {state && (
                    <button
                      onClick={() => {
                        handleToggleBoorkmark(state.coin);
                      }}
                      className="p-1 rounded-full  items-center"
                    >
                      {bookmarks.find(
                        (bookmark) => bookmark.symbol === state.coin.symbol
                      ) ? (
                        <HeartFill color="#FF0000" size={20} />
                      ) : (
                        <Heart color="#1c1c1f" />
                      )}
                    </button>
                  )}
                  <div className="flex flex-row gap-2 items-center">
                    <img
                      src={marketDetail?.image.large}
                      className="w-[25px] md:w-[50px]"
                    />
                    <h1 className="font-bold text-lg md:text-2xl">
                      {currency === "krw"
                        ? marketDetail?.localization.ko
                        : marketDetail?.localization.en}{" "}
                      ({marketDetail?.symbol.toLocaleUpperCase()})
                    </h1>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Select
                    value={currency}
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                    placeholder=""
                    onChange={(val) => {
                      setCurrency(val.toString());
                    }}
                  >
                    <Select.Option value="krw">KRW</Select.Option>
                    <Select.Option value="usd">USD</Select.Option>
                  </Select>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-2">
                <div className="w-full md:w-[50%]">
                  <div className="border border-zinc-100 rounded-lg overflow-hidden shadow-sm">
                    <div className="flex flex-row border-b border-zinc-100">
                      <div className="p-4 bg-[#f9f9f9] items-center flex justify-center">
                        <p className="w-[100px] font-bold text-xs md:text-md">
                          시가총액 Rank
                        </p>
                      </div>
                      <div className="flex-1 p-4 items-center">
                        <p className="text-xs md:text-md">
                          Rank #{marketDetail.market_cap_rank}
                        </p>
                      </div>
                    </div>
                    {marketDetail.links.homepage[0] && (
                      <div className="flex flex-row border-b border-zinc-100">
                        <div className="p-4 bg-[#f9f9f9] items-center flex justify-center">
                          <p className="w-[100px] font-bold text-xs md:text-md">
                            웹사이트
                          </p>
                        </div>
                        <div className="flex-1 p-4 items-center">
                          <a
                            href={marketDetail.links.homepage[0]}
                            target="__blank"
                            className="text-xs md:text-md hover:underline"
                          >
                            {marketDetail.links.homepage[0]}
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="w-full md:w-[50%]">
                  <div className="flex flex-col justify-betweenp-4">
                    <div className="flex flex-row justify-end gap-4">
                      <div className="flex flex-col justify-end items-end gap-2">
                        <h1 className="font-bold text-lg md:text-xl">
                          {currency === "usd"
                            ? formatBitcoinPrice(
                                marketDetail.market_data.current_price.usd,
                                currency
                              )
                            : formatBitcoinPrice(
                                marketDetail.market_data.current_price.krw,
                                currency
                              )}
                        </h1>
                        <p className="text-zinc-400 text-xs md:text-sm">
                          {marketDetail.market_data.current_price.btc} BTC
                        </p>
                      </div>

                      <div className="flex flex-col justify-end items-end gap-2">
                        <p
                          className={`text-sm md:text-md ${
                            calculatePriceChange(
                              marketDetail.market_data
                                .price_change_percentage_24h
                            ).flag
                              ? "text-[#FF5722]"
                              : "text-[#0070F3]"
                          }`}
                        >
                          {
                            calculatePriceChange(
                              marketDetail.market_data
                                .price_change_percentage_24h
                            ).value
                          }
                        </p>

                        <p
                          className={`text-xs md:text-sm ${
                            calculatePriceChange(
                              marketDetail.market_data
                                .price_change_percentage_24h_in_currency.btc
                            ).flag
                              ? "text-[#FF5722]"
                              : "text-[#0070F3]"
                          }`}
                        >
                          {
                            calculatePriceChange(
                              marketDetail.market_data
                                .price_change_percentage_24h_in_currency.btc
                            ).value
                          }
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-row justify-between items-center"></div>
                  </div>
                </div>
              </div>

              <BtcPriceCalculator
                symbol={marketDetail?.symbol.toLocaleUpperCase()}
                currency={currency}
                btcPrice={marketDetail.market_data.current_price.usd}
              />

              <div className="flex justify-center items-center">
                <div
                  onClick={() => {
                    setShowMore((prev) => !prev);
                  }}
                  className="flex flex-row gap-2 items-center cursor-pointer hover:backdrop-blur-sm"
                >
                  <p className="text-xs">설명보기</p>
                  {!showMore ? (
                    <ChevronDown size={15} />
                  ) : (
                    <ChevronUp size={15} />
                  )}
                </div>
              </div>

              {showMore && (
                <div className="animate-fade-in p-4">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: marketDetail.description.ko
                        ? currency === "krw"
                          ? marketDetail.description.ko
                          : marketDetail.description.en
                        : marketDetail.description.en,
                    }}
                    style={{
                      lineHeight: 2,
                    }}
                    className="text-xs md:text-sm"
                  />
                </div>
              )}
            </div>
          ) : null}
        </>
      )}
      {isError && (
        <div className="flex justify-center items-center">
          <p className="text-red-400 text-center py-4">
            코인 정보를 불러올 수 없습니다. 잠시 후 다시 시도해주세요.
          </p>
        </div>
      )}
    </section>
  );
};

export default MarketDetailPage;
