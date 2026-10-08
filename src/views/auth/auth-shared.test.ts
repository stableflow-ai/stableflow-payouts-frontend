import { describe, expect, it } from "vitest";
import { ApiError } from "@/lib/api-error";
import { isGoogleUnregisteredError, registerErrorMessage } from "./auth-shared";
import { GOOGLE_UNREGISTERED_CODE } from "./config";

describe("registerErrorMessage", () => {
  it("rewrites Code len validation into a readable message", () => {
    const pay = new ApiError(
      "Key: 'PayRegisterParam.Code' Error:Field validation for 'Code' failed on the 'len' tag",
      400,
      "400",
    );
    const payroll = new ApiError(
      "Key: 'PayrollRegisterParam.Code' Error:Field validation for 'Code' failed on the 'len' tag",
      400,
      "400",
    );
    expect(registerErrorMessage(pay, "Unable to create account")).toBe(
      "The verification code is invalid.",
    );
    expect(registerErrorMessage(payroll, "Unable to create account")).toBe(
      "The verification code is invalid.",
    );
    expect(registerErrorMessage(new ApiError("email already exists", 400, "400"), "Unable to create account")).toBe(
      "email already exists",
    );
  });
});

describe("isGoogleUnregisteredError", () => {
  it("matches envelope code 10008", () => {
    expect(isGoogleUnregisteredError(new ApiError("not registered", 200, GOOGLE_UNREGISTERED_CODE))).toBe(true);
    expect(isGoogleUnregisteredError(new ApiError("nope", 400, "400"))).toBe(false);
    expect(isGoogleUnregisteredError(new Error("nope"))).toBe(false);
  });
});
