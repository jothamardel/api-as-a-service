/* eslint-disable */
"use client";

import { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import logo from "@/public/logo.svg"

interface PayloadProps {
  amount: number;
  currency: string;
  coinId: string;
  networkId: string;
  reference: string;
  meta: {
    title: string;
    description: string;
    email: string;
    customerId: string;
    fullName: string;
  };
}
interface DataProps {
  amount: number;
  currency: string;
  coinId: string;
  networkId: string;
  reference: string;
  title: string;
  description: string;
  email: string;
  customerId: string;
  fullName: string;
}

export default function Checkout() {
  const [cartItems, setCartItems] = useState<number>(0);
  const [networks, setNetworks] = useState([]);
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [data, setData] = useState<DataProps>({
    amount: 1,
    coinId: "",
    currency: "usd",
    customerId: "489344",
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa expedita iure culpa? Dolorem, iure. Minima, praesentium quas amet mollitia nemo placeat vel incidunt, sequi repellat asperiores aperiam voluptate sed saepe?",
    email: "",
    fullName: "David Clair",
    networkId: "davidclair@gmail.com",
    reference: "",
    title: "Ankara Shoe",
  });
  const [errorResp, setErrorResp] = useState("");

  async function getNetworks() {
    if (!data.coinId) return;
    try {
      const response = await axios.get(
        `https://api.theclockchain.io/api/v1/wallet/checkout/networks/${data.coinId}`,
        {
          params: {
            coinId: `${data.coinId}`,
          },
          headers: {
            "clock-api-key":
              "cpay_live_sk_kx9ltn5ccd0la15emqggvwydejtvsxz2he638h10",
            // "cpay_test_sk_q1kca1623ghr96nfpy4u8pi6uikr5mw6jk9spapx",
          },
        }
      );
      setNetworks(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getCoins() {
    try {
      const response = await axios.get(
        "https://api.theclockchain.io/api/v1/wallet/checkout/coins",
        // "https://api.theclockchain.io/api/v1/wallet/checkout/coins",
        {
          headers: {
            "clock-api-key":
              "cpay_live_sk_kx9ltn5ccd0la15emqggvwydejtvsxz2he638h10",
            // "cpay_test_sk_q1kca1623ghr96nfpy4u8pi6uikr5mw6jk9spapx",
          },
        }
      );
      setCoins(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    const payload: PayloadProps = {
      amount: data.amount,
      currency: data.currency,
      coinId: data.coinId,
      networkId: data.networkId,
      reference: `${uuidv4()}`,
      meta: {
        title: data.title,
        description: data.description,
        email: data.email,
        customerId: data.customerId,
        fullName: data.fullName,
      },
    };

    try {
      const response = await axios.post(
        // "https://api.dev.theclockchain.io/api/v1/payment/link/create",
        "https://api.theclockchain.io/api/v1/payment/link/create",
        payload,
        {
          headers: {
            "clock-api-key":
              "cpay_live_sk_kx9ltn5ccd0la15emqggvwydejtvsxz2he638h10",
            // "cpay_test_sk_q1kca1623ghr96nfpy4u8pi6uikr5mw6jk9spapx",
          },
        }
      );
      console.log(response.data.data);
      window.location.href = `${response.data.data?.link}`;
      // setHtmlData(format(response.data));
      setLoading(false);
      // @typescript-eslint/no-explicit-any
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error?.response);
      setErrorResp(error?.response?.data?.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    getCoins();
  }, []);
  useEffect(() => {
    if (data.coinId) {
      getNetworks();
    }
  }, [data.coinId]);
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold  mb-8">Checkout</h1>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold  mb-4">
                Shipping Information
              </h2>
              <form>
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium  mb-1"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        id="first-name"
                        name="first-name"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium  mb-1"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="last-name"
                        name="last-name"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium  mb-1"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium  mb-1"
                    >
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium  mb-1"
                      >
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="postal-code"
                        className="block text-sm font-medium  mb-1"
                      >
                        Postal Code
                      </label>
                      <input
                        type="text"
                        id="postal-code"
                        name="postal-code"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="country"
                      className="block text-sm font-medium  mb-1"
                    >
                      Country
                    </label>
                    <select
                      id="country"
                      name="country"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select a country</option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>

            <div>
              <h2 className="text-xl font-semibold  mb-4">Order Summary</h2>
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <ul className="divide-y divide-gray-200">
                  <li className="py-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        src="https://img.freepik.com/premium-photo/yellow-orange-shoe-with-black-stripe_1313274-6892.jpg?w=1060"
                        alt="Product 1"
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="ml-4">
                        <h3 className="text-sm font-medium text-black">
                          Running Shoes
                        </h3>
                        <p className="text-sm text-black">Qty: 1</p>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-black">$99.99</p>
                  </li>
                </ul>
                <div className="border-t border-gray-200 mt-4 pt-4">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-black">Subtotal</p>
                    <p className="text-sm font-medium text-black">$99.99</p>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-sm text-black">Shipping</p>
                    <p className="text-sm font-medium text-black">$0.00</p>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-base font-medium text-black">Total</p>
                    <p className="text-base font-medium text-black">$99.99</p>
                  </div>
                </div>
              </div>

              <h2 className="text-xl font-semibold  mb-4">Payment</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                {/* <div className="grid gap-4">
                <div>
                  <label
                    htmlFor="card-number"
                    className="block text-sm font-medium  mb-1"
                  >
                    Card Number
                  </label>
                  <input
                    type="text"
                    id="card-number"
                    name="card-number"
                    placeholder="1234 5678 9012 3456"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="expiry-date"
                      className="block text-sm font-medium  mb-1"
                    >
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      id="expiry-date"
                      name="expiry-date"
                      placeholder="MM / YY"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="cvc"
                      className="block text-sm font-medium  mb-1"
                    >
                      CVC
                    </label>
                    <input
                      type="text"
                      id="cvc"
                      name="cvc"
                      placeholder="123"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div> */}

                <div className="mt-6">
                  <button
                    onClick={() => setModal(true)}
                    className="w-full bg-[#27AAE1] text-white py-3 px-4 rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                  >
                    Pay with ClockPay
                  </button>
                </div>
                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                  >
                    Pay with Card
                  </button>
                </div>

                <div className="mt-4 flex flex-col space-y-2">
                  <button
                    type="button"
                    className="w-full bg-black text-white py-3 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors flex items-center justify-center "
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-6h2v2h-2v-2zm0-8h2v6h-2V6z" />
                    </svg>
                    Pay with Apple Pay
                  </button>
                  <button
                    type="button"
                    className="w-full bg-white text-gray-800 py-3 px-4 rounded-md border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center justify-center"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-6h2v2h-2v-2zm0-8h2v6h-2V6z" />
                    </svg>
                    Pay with Google Pay
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {modal && (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black/70">
          <form
            className="border w-[90%] md:max-w-lg p-6 space-y-4 mt-10 shadow-lg rounded-2xl bg-white h-fit flex flex-col items-center "
            onSubmit={handleSubmit}
          >
            <div className=" flex justify-end w-full">
              <p
                onClick={() => setModal(false)}
                className=" cursor-pointer text-red-400"
              >
                close
              </p>
            </div>
            <div className="text-center w-full">
              <div className="flex justify-center items-center space-x-2">
                <img src="/usdc.png" alt="usdc" className="w-6" />
                <p className="text-black text-2xl font-bold">99.99</p>
                <span className="text-black">usdc</span>
              </div>
            </div>
            {errorResp && (
              <div className="border p-2 rounded-lg bg-red-200 text-red-700 border-red-700">
                {errorResp}
              </div>
            )}
            <div className=" w-full">
              <label className="text-black">Fullname: </label>
              <br />
              <input
                placeholder="Enter fullname"
                className="border p-2 rounded-md w-full outline-none text-black "
                name="fullName"
                defaultValue={"David Clair"}
                onChange={(e) =>
                  setData({ ...data, [e.target.name]: e.target.value })
                }
              />
            </div>

            <div className=" w-full">
              <label className="text-black">Email: </label>
              <br />
              <input
                placeholder="Enter the email"
                defaultValue={"davidclair@gmail.com"}
                className="border p-2 rounded-md w-full outline-none text-black"
                name="email"
                onChange={(e) =>
                  setData({ ...data, [e.target.name]: e.target.value })
                }
              />
            </div>

            <div className=" w-full">
              <label className="text-black">Preferred Currency: </label>
              <br />
              <select
                className="border rounded-md p-2 w-full outline-none form-select text-black"
                name="coinId"
                onChange={(e) =>
                  setData({ ...data, [e.target.name]: e.target.value })
                }
              >
                <option>Please select currency</option>
                {coins?.map((item: { id: string; name: string }) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className=" w-full">
              <label className="text-black">Network: </label>
              <br />
              <select
                className="border rounded-md p-2 w-full outline-none form-select text-black"
                name="networkId"
                onChange={(e) =>
                  setData({ ...data, [e.target.name]: e.target.value })
                }
              >
                <option>Please select network</option>
                {networks?.map((item: { id: string; name: string }) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-full">
              <button
                className="w-full btn bg-[#27AAE1] p-2 rounded-lg"
                type="submit"
                disabled={loading}
              >
                {loading ? "loading..." : "Submit"}
              </button>
            </div>
            <div className="flex mx-auto items-center justify-center mb-6 border rounded-xl p-2 w-full">
              <p className="text-base font-light text-black">
                Secured by
              </p>
              <img
                src={
                  "https://cpay.theclockchain.io/_next/static/media/brand.c857ecf9.svg"
                }
                alt="logo"
                className="w-[4.5rem] ml-2"
              />
            </div>
          </form>
        </div>
      )}
    </>
  );
}
