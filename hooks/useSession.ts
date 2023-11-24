import { useState, useEffect } from "react";
import {
  OKTA_URL,
  OKTA_CLIENT_ID,
  OKTA_REDIRECT_URI,
  CODE_VERIFIER_KEY,
} from "@/utils/constants";
import { AuthVerifyResponse } from "@/type";

const SESSIONKEY = "sess";

const goToOktaLogin = async () => {
  function getRandomString(len: number) {
    const a = new Uint8Array(Math.ceil(len / 2));
    crypto.getRandomValues(a);

    const str = Array.from(a, (dec) =>
      ("0" + dec.toString(16)).substr(-2)
    ).join("");
    return str.slice(0, len);
  }

  function makeVerifier() {
    const minLength = 43;
    const maxLength = 128;

    let verifier = "";

    if (verifier.length < minLength) {
      verifier = verifier + getRandomString(minLength - verifier.length);
    }

    return encodeURIComponent(verifier).slice(0, maxLength);
  }

  const codeVerifier = makeVerifier();

  window.localStorage.setItem(CODE_VERIFIER_KEY, codeVerifier);

  function base64URLEncode(input: string) {
    return btoa(input)
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }

  async function makeChallenge(str: string) {
    const buffer = new TextEncoder().encode(str);
    const arrayBuffer = await crypto.subtle.digest("SHA-256", buffer);
    const unitArray = new Uint8Array(arrayBuffer);
    const hash = String.fromCharCode.apply(null, Array.from(unitArray));
    return base64URLEncode(hash);
  }

  const codeChallenge = await makeChallenge(codeVerifier);

  const params = new URLSearchParams();

  params.set("client_id", OKTA_CLIENT_ID);
  params.set("redirect_uri", OKTA_REDIRECT_URI);
  params.set("response_type", "code");
  params.set("state", "OR");
  params.set("code_challenge", codeChallenge);
  params.set("code_challenge_method", "S256");
  params.set("scope", "openid profile email");

  window.location.href =
    `https://${OKTA_URL}/v1/authorize?` + params.toString();
};

const verifySession = (session: string) => {
  return fetch("/api/auth/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: { accessToken: session } }),
  })
    .then((res) => res.json())
    .then((res: AuthVerifyResponse) => {
      if (!res?.data?.valid) {
        throw new Error("JWT validation failed");
      }
    });
};

type useSessionOpts = {
  keepRenderIfNoSession: boolean;
};

export default function useSession({
  keepRenderIfNoSession = false,
}: useSessionOpts) {
  const [sessionState, setSessionState] = useState("");
  const [isSessionVerified, setIsSessionVerified] = useState(false);

  useEffect(() => {
    if (isSessionVerified) return;
    const sessionInLocal = window.localStorage.getItem(SESSIONKEY);
    if (sessionInLocal) {
      verifySession(sessionInLocal)
        .then(() => {
          setIsSessionVerified(true);
          setSession(sessionInLocal);
        })
        .catch(() => {
          window.localStorage.removeItem(SESSIONKEY);
          goToOktaLogin();
        });
    } else if (!keepRenderIfNoSession) {
      goToOktaLogin();
    }
  });

  const setSession = (session: string) => {
    window.localStorage.setItem(SESSIONKEY, session);
    setSessionState(session);
  };

  return { session: sessionState, setSession };
}
