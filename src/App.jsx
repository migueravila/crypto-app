import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import InstructionsModal from "./components/InstructionsModal"; // New component for the modal
import CurrencySelector from "./components/CurrencySelector"; // New component for currency selection
import "./App.css";

Modal.setAppElement("#root");

function App() {
  const [cryptoCurrencies, setCryptoCurrencies] = useState([]);
  const [baseCurrency, setBaseCurrency] = useState("");
  const [targetCurrency, setTargetCurrency] = useState("");
  const [exchangeRate, setExchangeRate] = useState(null);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(true);

  useEffect(() => {
    const fetchCryptoCurrencies = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/list"
        );

        if (response.status === 200) {
          setCryptoCurrencies(response.data);
        } else {
          setError(
            `Error fetching cryptocurrencies. Status code: ${response.status}`
          );
        }
      } catch (error) {
        console.error("Error fetching cryptocurrencies:", error);
        setError(
          "Error fetching cryptocurrencies. Please check your internet connection."
        );
      }
    };

    fetchCryptoCurrencies();
  }, []);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      if (baseCurrency && targetCurrency) {
        try {
          const response = await axios.get(
            `https://api.coingecko.com/api/v3/simple/price?ids=${baseCurrency}&vs_currencies=${targetCurrency}`
          );

          if (response.status === 200) {
            const data = response.data;
            if (baseCurrency in data && targetCurrency in data[baseCurrency]) {
              setExchangeRate(data[baseCurrency][targetCurrency]);
              setError(null);
            } else {
              setError(
                "Invalid currencies selected. Please check and try again."
              );
            }
          } else {
            setError("Error fetching exchange rate. Please try again later.");
          }
        } catch (error) {
          setError(
            "Error fetching exchange rate. Please check your internet connection."
          );
        }
      }
    };

    fetchExchangeRate();
  }, [baseCurrency, targetCurrency]);

  const handleBaseCurrencyChange = (event) => {
    setBaseCurrency(event.target.value);
  };

  const handleTargetCurrencyChange = (event) => {
    setTargetCurrency(event.target.value);
  };

  const formatAsMoney = (number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: targetCurrency.toUpperCase(),
    }).format(number);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="App">
      <InstructionsModal isOpen={isModalOpen} closeModal={closeModal} />

      <div className="translator-card">
        <h1 className="app-title">Crypto Exchange Rate</h1>

        <CurrencySelector
          label="Cryptocurrency"
          value={baseCurrency}
          onChange={handleBaseCurrencyChange}
          options={cryptoCurrencies.map((crypto) => ({
            value: crypto.id,
            label: `${crypto.name} (${crypto.symbol.toUpperCase()})`,
          }))}
        />

        <CurrencySelector
          label="Traditional Currency"
          value={targetCurrency}
          onChange={handleTargetCurrencyChange}
          options={[
            { value: "usd", label: "USD" },
            { value: "eur", label: "EUR" },
            { value: "gbp", label: "GBP" },
            // Add more options as needed
          ]}
        />

        <div className="result-container">
          {exchangeRate !== null && (
            <p>
              <span className="rounded-number">1</span>{" "}
              {baseCurrency.toUpperCase()} →{" "}
              <span className="rounded-number">
                {formatAsMoney(exchangeRate)}
              </span>{" "}
              {targetCurrency.toUpperCase()}{" "}
            </p>
          )}
        </div>

        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}

export default App;
