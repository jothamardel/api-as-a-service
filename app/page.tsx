"use client";

import { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

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

// interface Response {
//   response: { data: { message: string } };
// }

export default function Home() {
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
    fullName: "",
    networkId: "",
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
        {
          headers: {
            "clock-api-key":
              "cpay_live_sk_kx9ltn5ccd0la15emqggvwydejtvsxz2he638h10",
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
        "https://api.theclockchain.io/api/v1/payment/link/create",
        payload,
        {
          headers: {
            "clock-api-key":
              "cpay_live_sk_kx9ltn5ccd0la15emqggvwydejtvsxz2he638h10",
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
  // function format(html: any) {
  //   const tab = "\t";
  //   let result = "";
  //   let indent = "";

  //   html.split(/>\s*</).forEach(function (element: any) {
  //     if (element.match(/^\/\w/)) {
  //       indent = indent.substring(tab.length);
  //     }

  //     result += indent + "<" + element + ">\r\n";

  //     if (element.match(/^<?\w[^>]*[^\/]$/) && !element.startsWith("input")) {
  //       indent += tab;
  //     }
  //   });

  //   return result.substring(1, result.length - 3);
  // }

  useEffect(() => {
    getCoins();
  }, []);
  useEffect(() => {
    if (data.coinId) {
      getNetworks();
    }
  }, [data.coinId]);

  return (
    <div className="flex justify-center items-center h-screen bg-white p-6 relative">
      <div className="border rounded-2xl p-4 w-1/5 text-black">
        <div className="">
          <img
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg0.etsystatic.com%2F192%2F1%2F7518594%2Fil_570xN.1254470102_lysd.jpg&f=1&nofb=1&ipt=eb6f6c2cf5cae7a80149094bc48b8b6268a921f55e7392f2c3c87c38ed91523b&ipo=images"
            className="w-full h-full"
            alt=""
          />
        </div>
        <div className="flex justify-between items-center">
          <h1 className="font-bold">Ankara Shoe</h1>
          <p className="font-bold text-blue-600">$1/1usdc</p>
        </div>
        <p className="text-gray-700 text-sm">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa
          expedita iure culpa? Dolorem, iure. Minima, praesentium quas amet
          mollitia nemo placeat vel incidunt, sequi repellat asperiores aperiam
          voluptate sed saepe?
        </p>
        <button
          className="w-full btn bg-blue-500 p-2 rounded-lg text-white"
          onClick={() => setModal(true)}
        >
          {loading ? "loading..." : "Checkout with ClockPay"}
        </button>
      </div>

      {modal && (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black/70">
          <form
            className="border w-1/3 p-6 space-y-4 mt-10 shadow-lg rounded-md bg-white h-fit"
            onSubmit={handleSubmit}
          >
            <div className="w-full flex justify-end">
              <p
                onClick={() => setModal(false)}
                className=" cursor-pointer text-red-400"
              >
                close
              </p>
            </div>
            {errorResp && (
              <div className="border p-2 rounded-lg bg-red-200 text-red-700 border-red-700">
                {errorResp}
              </div>
            )}
            <div className="">
              <label className="text-black">Fullname: </label>
              <br />
              <input
                placeholder="Enter fullname"
                className="border p-2 rounded-md w-full outline-none text-black"
                name="fullName"
                onChange={(e) =>
                  setData({ ...data, [e.target.name]: e.target.value })
                }
              />
            </div>

            <div className="">
              <label className="text-black">Email: </label>
              <br />
              <input
                placeholder="Enter the email"
                className="border p-2 rounded-md w-full outline-none text-black"
                name="email"
                onChange={(e) =>
                  setData({ ...data, [e.target.name]: e.target.value })
                }
              />
            </div>

            <div className="">
              <label className="text-black">Coin: </label>
              <br />
              <select
                className="border rounded-md p-2 w-full outline-none form-select text-black"
                name="coinId"
                onChange={(e) =>
                  setData({ ...data, [e.target.name]: e.target.value })
                }
              >
                <option>Please select coin</option>
                {coins?.map((item: { id: string; name: string }) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="">
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

            <div>
              <button
                className="w-full btn bg-blue-500 p-2 rounded-lg"
                type="submit"
                disabled={loading}
              >
                {loading ? "loading..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
