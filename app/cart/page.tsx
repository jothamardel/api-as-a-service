/* eslint-disable */
'use client';

import { FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { Header } from '@/components/Header';

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
  const [cartItems, setCartItems] = useState<number>(0);
  const [networks, setNetworks] = useState([]);
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [data, setData] = useState<DataProps>({
    amount: 1,
    coinId: '',
    currency: 'usd',
    customerId: '489344',
    description:
      "Discover our latest collection of shoes that blend style and comfort seamlessly. From casual sneakers to elegant formal wear, our shoes are crafted with premium materials to ensure durability and a perfect fit. Whether you're stepping out for a casual day or a special occasion, our diverse range of footwear has something for everyone. Experience the perfect combination of fashion and functionality with our exclusive shoe collection.",
    email: '',
    fullName: '',
    networkId: '',
    reference: '',
    title: 'Ankara Shoe',
  });
  const [errorResp, setErrorResp] = useState('');

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
            'clock-api-key':
              'cpay_live_sk_kx9ltn5ccd0la15emqggvwydejtvsxz2he638h10',
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
        'https://api.theclockchain.io/api/v1/wallet/checkout/coins',
        // "https://api.theclockchain.io/api/v1/wallet/checkout/coins",
        {
          headers: {
            'clock-api-key':
              'cpay_live_sk_kx9ltn5ccd0la15emqggvwydejtvsxz2he638h10',
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
        'https://api.theclockchain.io/api/v1/payment/link/create',
        payload,
        {
          headers: {
            'clock-api-key':
              'cpay_live_sk_kx9ltn5ccd0la15emqggvwydejtvsxz2he638h10',
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
    <>
      <Header cartItems={cartItems} />
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-6xl mx-auto'>
          <nav className='mb-8'>
            <ol className='flex items-center space-x-2 text-sm '>
              <li>
                <a href='/' className='hover:'>
                  Home
                </a>
              </li>
              <li>
                <span className='mx-2'>/</span>
              </li>
              <li>
                <a href='#' className='hover:'>
                  cart
                </a>
              </li>
            </ol>
          </nav>

          <div className='grid md:grid-cols-2 gap-8'>
            <div className='aspect-square relative overflow-hidden rounded-lg bg-gray-200'>
              <img
                src='https://img.freepik.com/premium-photo/yellow-orange-shoe-with-black-stripe_1313274-6892.jpg?w=1060'
                alt='Ergonomic Chair'
                className='absolute inset-0 w-full h-full object-cover'
              />
            </div>

            <div>
              <h1 className='text-3xl font-bold  mb-4'>Running Shoes</h1>
              <div className='flex items-center mb-4'>
                <div className='flex items-center'>
                  <svg
                    className='w-5 h-5 text-yellow-400'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
                  </svg>
                  <svg
                    className='w-5 h-5 text-yellow-400'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
                  </svg>
                  <svg
                    className='w-5 h-5 text-yellow-400'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
                  </svg>
                  <svg
                    className='w-5 h-5 text-yellow-400'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
                  </svg>
                  <svg
                    className='w-5 h-5 text-gray-300'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
                  </svg>
                </div>
                <p className='ml-2 text-sm '>4.0 (24 reviews)</p>
              </div>
              <p className='text-2xl font-bold mb-4'>$99.99</p>
              <p className=' mb-6'>
                Stay ahead in style and comfort with our ultra-light running
                shoes. Engineered for durability and support, these shoes
                feature breathable mesh fabric, shock-absorbing soles, and a
                flexible design for enhanced movement. Perfect for beginners and
                seasoned runners alike, they deliver an unmatched blend of
                performance and style, helping you go the extra mile.
              </p>

              <div className='mb-6'>
                <h2 className='text-sm font-medium mb-2'>Color</h2>
                <div className='flex items-center space-x-3'>
                  <button className='w-8 h-8 bg-gray-900 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'></button>
                  <button className='w-8 h-8 bg-blue-800 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'></button>
                  <button className='w-8 h-8 bg-red-800 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'></button>
                </div>
              </div>

              <button
                onClick={() => setCartItems(cartItems + 1)}
                className='w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors'
              >
                Add to Cart
              </button>
            </div>
          </div>

          <div className='mt-16'>
            <h2 className='text-2xl font-bold mb-4'>Product Details</h2>
            <ul className='list-disc pl-5 space-y-2 '>
              <li>
                Lightweight & Breathable: Crafted with airy mesh fabric,
                ensuring maximum ventilation for cool, dry comfort during every
                run.
              </li>
              <li>
                Shock-Absorbing Sole: Features a cushioned sole designed to
                reduce impact, providing a smoother stride and better support.
              </li>
              <li>
                Flexible Design: Allows natural foot movement with every step,
                enhancing agility and performance.
              </li>
              <li>
                Durable & Stylish: Built to last with a sleek, modern look that
                suits both activewear and casual outfits.
              </li>
              <li>
                All-Terrain Traction: Engineered grip for stable footing on
                roads, trails, and treadmills.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );

  // return (
  //   <div className="flex justify-center items-center h-screen bg-white p-6 relative">
  //     <div className="border rounded-2xl p-4 w-1/5 text-black ">
  //       <div className="">
  //         <img
  //           src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg0.etsystatic.com%2F192%2F1%2F7518594%2Fil_570xN.1254470102_lysd.jpg&f=1&nofb=1&ipt=eb6f6c2cf5cae7a80149094bc48b8b6268a921f55e7392f2c3c87c38ed91523b&ipo=images"
  //           className="w-full h-full"
  //           alt=""
  //         />
  //       </div>
  //       <div className="flex justify-between items-center">
  //         <h1 className="font-bold">Ankara Shoe</h1>
  //         <p className="font-bold text-blue-600">$1/1usdc</p>
  //       </div>
  //       <p className=" text-sm">
  //  "Discover our latest collection of shoes that blend style and comfort seamlessly. From casual sneakers to elegant formal wear, our shoes are crafted with premium materials to ensure durability and a perfect fit. Whether you're stepping out for a casual day or a special occasion, our diverse range of footwear has something for everyone. Experience the perfect combination of fashion and functionality with our exclusive shoe collection.";
  //       </p>
  //       <button
  //         className="w-full btn bg-blue-500 p-2 rounded-lg text-white"
  //         onClick={() => setModal(true)}
  //       >
  //         {loading ? "loading..." : "Checkout with ClockPay"}
  //       </button>
  //     </div>

  // {modal && (
  //   <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black/70">
  //     <form
  //       className="border w-1/3 p-6 space-y-4 mt-10 shadow-lg rounded-md bg-white h-fit"
  //       onSubmit={handleSubmit}
  //     >
  //       <div className="w-full flex justify-end">
  //         <p
  //           onClick={() => setModal(false)}
  //           className=" cursor-pointer text-red-400"
  //         >
  //           close
  //         </p>
  //       </div>
  //       {errorResp && (
  //         <div className="border p-2 rounded-lg bg-red-200 text-red-700 border-red-700">
  //           {errorResp}
  //         </div>
  //       )}
  //       <div className="">
  //         <label className="text-black">Fullname: </label>
  //         <br />
  //         <input
  //           placeholder="Enter fullname"
  //           className="border p-2 rounded-md w-full outline-none text-black"
  //           name="fullName"
  //           onChange={(e) =>
  //             setData({ ...data, [e.target.name]: e.target.value })
  //           }
  //         />
  //       </div>

  //       <div className="">
  //         <label className="text-black">Email: </label>
  //         <br />
  //         <input
  //           placeholder="Enter the email"
  //           className="border p-2 rounded-md w-full outline-none text-black"
  //           name="email"
  //           onChange={(e) =>
  //             setData({ ...data, [e.target.name]: e.target.value })
  //           }
  //         />
  //       </div>

  //       <div className="">
  //         <label className="text-black">Preferred Currency: </label>
  //         <br />
  //         <select
  //           className="border rounded-md p-2 w-full outline-none form-select text-black"
  //           name="coinId"
  //           onChange={(e) =>
  //             setData({ ...data, [e.target.name]: e.target.value })
  //           }
  //         >
  //           <option>Please select currency</option>
  //           {coins?.map((item: { id: string; name: string }) => (
  //             <option key={item.id} value={item.id}>
  //               {item.name}
  //             </option>
  //           ))}
  //         </select>
  //       </div>
  //       <div className="">
  //         <label className="text-black">Network: </label>
  //         <br />
  //         <select
  //           className="border rounded-md p-2 w-full outline-none form-select text-black"
  //           name="networkId"
  //           onChange={(e) =>
  //             setData({ ...data, [e.target.name]: e.target.value })
  //           }
  //         >
  //           <option>Please select network</option>
  //           {networks?.map((item: { id: string; name: string }) => (
  //             <option key={item.id} value={item.id}>
  //               {item.name}
  //             </option>
  //           ))}
  //         </select>
  //       </div>

  //       <div>
  //         <button
  //           className="w-full btn bg-blue-500 p-2 rounded-lg"
  //           type="submit"
  //           disabled={loading}
  //         >
  //           {loading ? "loading..." : "Submit"}
  //         </button>
  //       </div>
  //     </form>
  //   </div>
  // )}
  //   </div>
  // );
}
