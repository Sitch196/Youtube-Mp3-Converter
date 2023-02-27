import axios from "axios";
import { useRef, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Spinner from "./Spinner";
import { youtube_parser } from "./URL_PARSER";

const GlobalStyle = createGlobalStyle`
    body {
      margin: 0;
      padding:0;
       font-family: 'poppins', sans-serif;
      background: linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(210,38,221,1) 100%);
    }
  `;

function App() {
  const urlRef = useRef();
  const [url, setUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = function (e) {
    e.preventDefault();
    setIsLoading(true);
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
      .then((response) => {
        setUrl(response.data.link);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });

    urlRef.current.value = "";
  };
  return (
    <Container>
      <Logo>Youtube to Mp3 Converter </Logo>
      <BigContainer>
        <GlobalStyle />
        <Form onSubmit={handleSubmit}>
          <Input
            ref={urlRef}
            type="text"
            placeholder="Paste Your YoutubeLink here"
          />

          <Button type="submit">Convert</Button>
          {isLoading ? (
            <Spinner />
          ) : url ? (
            <Download target="_blank" rel="noreferrer" href={url}>
              &#8595; Download Mp3{" "}
            </Download>
          ) : (
            ""
          )}
        </Form>
      </BigContainer>
    </Container>
  );
}

export default App;

const Logo = styled.p`
  position: absolute;
  top: 1rem;
  left: 1rem;
  color: whitesmoke;
  text-transform: uppercase;
`;

const Download = styled.a`
  border: 1px solid violet;
  width: 10rem;
  text-decoration: none;
  color: whitesmoke;
  padding: 1rem;
  font-weight: 600;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.5);
  text-transform: uppercase;
  margin-top: 5rem;
  text-align: center;

  &:active {
    box-shadow: none;
  }
`;
const Input = styled.input`
  height: 3rem;
  width: 100%;
  text-indent: 15px;

  &:focus {
    outline: none;
  }
`;
const Button = styled.button`
  width: 10rem;
  height: 3rem;
  background-color: #bd25bd;
  text-transform: uppercase;
  font-weight: bold;
  font-family: "poppins";
  color: whitesmoke;
  cursor: pointer;
  outline: none;
  border: none;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
`;
const Form = styled.form`
  height: 100%;
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
  align-items: center;
`;
const BigContainer = styled.div`
  width: 30rem;
  height: 20rem;
  padding: 1rem;
`;
const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
