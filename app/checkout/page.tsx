export default function Checkout() {
  return (
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
            <form>
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
                  type="submit"
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
  );
}
