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
import jwt from "jsonwebtoken";

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

  useEffect(() => {
    if (codeRequested) return; // prevent useEffect trigger twice
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search.slice(1));
    const code = searchParams.get("code");
    const codeVerifier = localStorage.getItem(CODE_VERIFIER_KEY);
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
        setCodeRequested(true);
        console.log(body);

        if (body.access_token !== undefined && body.id_token !== undefined) {

          const decodeIdToken = jwt.decode(body.id_token);

          console.log("asdasdasda", decodeIdToken);
          console.log(typeof decodeIdToken === "object" );

          if(typeof decodeIdToken && typeof decodeIdToken === "object" ){

            window.localStorage.setItem(
              "username",
               decodeIdToken?.name
            );
          }else{
            window.localStorage.setItem(
              "username", "H i"
            );
          }

          const decodeAccessToken = jwt.decode(body.access_token);
          if(typeof decodeAccessToken || typeof decodeAccessToken === "object"){

            window.localStorage.setItem(
              "email",
              decodeAccessToken?.sub as string
            );
            
          }else{
            window.localStorage.setItem(
              "email", "User@nike.com"
            );
          }
          setSession(body.access_token);
          router.replace("/");
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
  }, [codeRequested, router, setSession]);

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-black">
      <h1 className="text-white eds-type--display-5">
        Authenticating... Please wait a moment
      </h1>
    </div>
  );
}
