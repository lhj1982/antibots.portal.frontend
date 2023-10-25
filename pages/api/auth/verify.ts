import type { NextApiRequest, NextApiResponse } from "next";
import OktaJwtVerifier from "@okta/jwt-verifier";
import { OKTA_ISSUER, OKTA_AUD } from "@/utils/constants";

type ReqBody = {
  data?: {
    accessToken?: string;
  };
};

type JwtVerifyError = {
  userMessage: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AuthVerifyResponse>
) {
  const body: ReqBody = req.body;

  const accessToken = body?.data?.accessToken;
  if (!accessToken) {
    return res.status(400).json({ error: "missing access token" });
  }

  const oktaJwtVerifier = new OktaJwtVerifier({
    issuer: OKTA_ISSUER,
  });

  try {
    await oktaJwtVerifier.verifyAccessToken(accessToken, OKTA_AUD);
    res.status(200).json({ data: { valid: true } });
  } catch (error) {
    const verifyError = error as JwtVerifyError;
    res.status(400).json({
      error: verifyError.userMessage,
    });
  }
}
