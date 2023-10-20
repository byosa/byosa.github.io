import "./App.css";

import { useState } from "react";
import ReactGA from "react-ga4";

ReactGA.initialize("G-VXM9EWJ8D3");

function App() {
  const [email, setEmail] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [buttonText, setButtonText] = useState("Email me when BYOSA is ready!");

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsDisabled(true);
    fetch("https://formsubmit.co/ec8dc795d11c4e91653ba86d5ffbaca1", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        _captcha: "false",
        email: email,
        message: "BYOSA subscription",
      }),
    })
      .then((response) => {
        setButtonText("Subscribed!");
      })
      .catch((error) => {
        setButtonText("Error occurred. Check console log");
        console.log(error);
      });
  };

  return (
    <div className="App">
      <img className="logo" src="logo.png" />
      <div className="sub upper">Enabling football clubs of all levels</div>
      <div className="sub lower">
        to build a fully personalised analytical hub
      </div>
      <div className="sub signup">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            class="form-control"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isDisabled}
            required
          />
          <button type="submit" disabled={isDisabled}>
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
