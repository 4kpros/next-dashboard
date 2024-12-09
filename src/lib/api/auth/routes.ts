import { POST } from "@/lib/http/http";
import {
  ActivateRequest,
  ForgotCodeRequest,
  ForgotInitEmailRequest,
  ForgotInitPhoneNumberRequest,
  ForgotNewPasswordRequest,
  SignInEmailRequest,
  SignInProviderRequest,
  SignUpEmailRequest,
} from "./request";
import {
  ActivateResponse,
  ForgotCodeResponse,
  ForgotInitResponse,
  ForgotNewPasswordResponse,
  SignInResponse,
} from "./response";

export async function signUpWithCredentialsEmail(data: SignUpEmailRequest) {
  let newData = data;
  newData.confirmPassword = undefined;
  return POST<SignInResponse, SignInEmailRequest>(
    "/auth/register/email",
    newData
  );
}

export async function signInWithCredentialsEmail(data: SignInEmailRequest) {
  return POST<SignInResponse, SignInEmailRequest>("/auth/login/email", data);
}

export async function signInWithProvider(provider: string, token: string) {
  return POST<SignInResponse, SignInProviderRequest>("/auth/login/provider", {
    provider: provider,
    token: token,
  });
}

export async function activateAccount(data: ActivateRequest) {
  return POST<ActivateResponse, ActivateRequest>("/auth/activate", data);
}

export async function forgotPasswordInitEmail(data: ForgotInitEmailRequest) {
  return POST<ForgotInitResponse, ForgotInitEmailRequest>(
    "/auth/forgot/initemail",
    data
  );
}

export async function forgotPasswordInitPhoneNumber(
  data: ForgotInitPhoneNumberRequest
) {
  return POST<ForgotInitResponse, ForgotInitPhoneNumberRequest>(
    "/auth/forgot/initphone",
    data
  );
}

export async function forgotPasswordCode(data: ForgotCodeRequest) {
  return POST<ForgotCodeResponse, ForgotCodeRequest>(
    "/auth/forgot/checkcode",
    data
  );
}

export async function forgotPasswordNewPassword(
  data: ForgotNewPasswordRequest
) {
  let newData = data;
  newData.confirmPassword = undefined;
  return POST<ForgotNewPasswordResponse, ForgotNewPasswordRequest>(
    "/auth/forgot/newpassword",
    newData
  );
}
