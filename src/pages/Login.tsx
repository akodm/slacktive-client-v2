import { useEffect } from "react"
import styled from "styled-components";

import { API_URL } from "../utils/consts";
import { apiAxios, defaultAxios, setAuth } from "../utils/axios";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const SlackButton = styled.a`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 224px;
  height: 44px;
  border: 0;
  border-radius: 4px;
  background-color: #4A154B;
  color: white;
  font-family: Lato, sans-serif;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;

const SlackSvg = styled.svg`
  width: 16px;
  height: 16px;
  margin-right: 12px;
`;

const oauthProcess = async (code: string, state: string) => {
  try {
    const { data } = await defaultAxios.get(`/login/process?code=${code}&state=${state}`, {
      maxRedirects: 0,
    });

    if (data.access) {
      setAuth(data.access);
    }
  } catch (err) {
    console.error(err);
    window.alert("로그인에 실패하였습니다. 다시 시도해 주세요.");
  }
};

export default function Login() {
  useEffect(() => {
    const location: any = window.location;
    const urls = new URL(location);

    const code = urls.searchParams.get("code");
    const state = urls.searchParams.get("state");

    if (code && state) {
      oauthProcess(code, state);
    }
  }, []);

  return <Container>
    <SlackButton href={`${API_URL}/login`}>
      <SlackSvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 122.8 122.8">
        <path d="M25.8 77.6c0 7.1-5.8 12.9-12.9 12.9S0 84.7 0 77.6s5.8-12.9 12.9-12.9h12.9v12.9zm6.5 0c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9v32.3c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V77.6z" fill="#e01e5a" />
        <path d="M45.2 25.8c-7.1 0-12.9-5.8-12.9-12.9S38.1 0 45.2 0s12.9 5.8 12.9 12.9v12.9H45.2zm0 6.5c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H12.9C5.8 58.1 0 52.3 0 45.2s5.8-12.9 12.9-12.9h32.3z" fill="#36c5f0" />
        <path d="M97 45.2c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9-5.8 12.9-12.9 12.9H97V45.2zm-6.5 0c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V12.9C64.7 5.8 70.5 0 77.6 0s12.9 5.8 12.9 12.9v32.3z" fill="#2eb67d" />
        <path d="M77.6 97c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9-12.9-5.8-12.9-12.9V97h12.9zm0-6.5c-7.1 0-12.9-5.8-12.9-12.9s5.8-12.9 12.9-12.9h32.3c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H77.6z" fill="#ecb22e" />
      </SlackSvg>
      Sign in with Slack
    </SlackButton>
  </Container>
};
