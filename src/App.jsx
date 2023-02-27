import axios from "axios";
import { useRef, useState } from "react";
import { youtube_parser } from "./URL_PARSER";

function App() {
  const urlRef = useRef();
  const [url, setUrl] = useState(null);
  const handleSubmit = function (e) {
    e.preventDefault();
    console.log(urlRef.current.value);
    const youtubeID = youtube_parser(urlRef.current.value);
    console.log(youtubeID);

    const options = {
      method: "get",
      url: "https://youtube-mp36.p.rapidapi.com/dl",
      headers: {
        "X-RapidAPI-Key": "d0b4be5dc9mshf40951c03e0ecfep1d36b5jsnc315bc54f5dd",
        "X-RapidAPI-Host": "youtube-mp36.p.rapidapi.com",
      },
      params: {
        id: youtubeID,
      },
    };

    axios(options)
      .then((response) => setUrl(response.data.link))
      .catch((err) => console.error(err));

    urlRef.current.value = "";
  };
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          ref={urlRef}
          type="text"
          placeholder="Paste Your YoutubeLink here"
        />

        <button type="submit">Convert</button>
      </form>
      {url ? (
        <a target="_blank" rel="noreferrer" href={url}>
          Download{" "}
        </a>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
