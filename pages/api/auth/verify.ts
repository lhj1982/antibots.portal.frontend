import type { NextApiRequest, NextApiResponse } from "next";
import OktaJwtVerifier from "@okta/jwt-verifier";
import { OKTA_ISSUER, OKTA_AUD } from "@/utils/constants";
import { AuthVerifyResponse } from "@/type";

type ReqBody = {
  data?: {
    accessToken?: string;
  };
};

type JwtVerifyError = {
  userMessage: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<AuthVerifyResponse>) {
  const body: ReqBody = req.body;

  const accessToken = body?.data?.accessToken;
  console.log('handler', { OKTA_ISSUER, OKTA_AUD, accessToken });

  if (!accessToken) {
    console.log("No access token, missing access token");
    return res.status(400).json({ error: 'missing access token' });
  }

  const oktaJwtVerifier = new OktaJwtVerifier({
    issuer: OKTA_ISSUER,
  });

  try {
    await oktaJwtVerifier.verifyAccessToken(accessToken, OKTA_AUD);
    res.status(200).json({ data: { valid: true } });
    console.log("Token verified successfully");
  } catch (error) {
    const verifyError = error as JwtVerifyError;
    console.log(res.status(400).json({
      error: verifyError.userMessage,
    }));
    console.log("Token verify failed", verifyError);
  }
}
