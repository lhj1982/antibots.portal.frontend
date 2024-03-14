"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useSession from "@/hooks/useSession";
import {
  OKTA_URL,
  OKTA_CLIENT_ID,
  OKTA_REDIRECT_URI,
  CODE_VERIFIER_KEY,
} from "@/utils/constants";
import jwt, { JwtPayload } from "jsonwebtoken";
import { useUserStore } from "@/zustand/userStore";

type TokenResponse = {
  access_token?: string;
  expires_in?: number;
  id_token?: string;
  scope?: string;
  token_type?: string;
  error?: string;
  error_description?: string;
};

export default function CallbackPage() {
  const router = useRouter();
  const { session, setSession } = useSession({ keepRenderIfNoSession: true });
  const [codeRequested, setCodeRequested] = useState(false);
  const { setUsername, setEmail } = useUserStore();

  useEffect(() => {
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search.slice(1));
    const code = searchParams.get("code");
    const codeVerifier = window.localStorage.getItem(CODE_VERIFIER_KEY);
    const params = new URLSearchParams();

    if (!code || !codeVerifier) throw new Error("params missed");

    params.set("code", code);
    params.set(CODE_VERIFIER_KEY, codeVerifier);
    params.set("grant_type", "authorization_code");
    params.set("redirect_uri", OKTA_REDIRECT_URI);
    params.set("client_id", OKTA_CLIENT_ID);

    const fetchCode = async () => {
      try {
        const response = await fetch(`https://${OKTA_URL}/v1/token`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Cache-Control": "no-cache",
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: params,
        });
        const body: TokenResponse = await response.json();

        if (body.access_token && body.id_token){
          const decodeIdToken  = jwt.decode(body.id_token);
          const username = typeof decodeIdToken === "object" && decodeIdToken!== null?  decodeIdToken.name: "H i";
          window.localStorage.setItem("username", username);
          setUsername(username);

          const decodeAccessToken = jwt.decode(body.access_token);
          const email =  typeof decodeAccessToken === "object" && decodeAccessToken!== null?  decodeAccessToken.sub as any: "User@nike.com";
          setEmail(email);
          window.localStorage.setItem("email", email);
          setSession(body.access_token);
          router.replace('/');
          return;
        }

        if (body.error_description) {
          throw new Error(body.error_description);
        }
      } catch (e) {
        if (e instanceof Error) {
          throw new Error(e.message);
        }
      }

      window.localStorage.removeItem(CODE_VERIFIER_KEY);
    };

    fetchCode();
  }, [router, setEmail, setSession, setUsername]);

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-black">
      <h1 className="text-white eds-type--display-5">
        Authenticating... Please wait a moment
      </h1>
    </div>
  );
}
