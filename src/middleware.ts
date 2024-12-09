import { NextRequest, NextResponse } from "next/server";
import { auth } from "../auth";
import { getToken, JWT } from "next-auth/jwt";
import {
  FEATURE_ADMIN,
  FEATURE_DIRECTOR,
  FEATURE_PARENT,
  FEATURE_STUDENT,
  FEATURE_TEACHER,
} from "./lib/features";
import {
  ROUTE_API_BASE_URL_INTERNAL,
  ROUTE_INVALID_FEATURE_PERMISSION,
  ROUTE_PROTECTED_ADMIN,
  ROUTE_PROTECTED_DIRECTOR,
  ROUTE_PROTECTED_LIST,
  ROUTE_PROTECTED_PARENT,
  ROUTE_PROTECTED_STUDENT,
  ROUTE_PROTECTED_TEACHER,
} from "./lib/routes";

export default auth(async (req: NextRequest) => {
  const response = NextResponse.next();

  const pathname = req.nextUrl.pathname;
  const jwt = await getJwtToken(req);
  const accessToken = getAccessToken(jwt);

  // Rewrite to API url
  if (pathname.startsWith(ROUTE_API_BASE_URL_INTERNAL)) {
    const newHeaders = new Headers(req.headers);
    newHeaders.set("Content-Type", "application/json");
    newHeaders.set("Accept", "application/json");
    if (accessToken) {
      newHeaders.set("Authorization", `Bearer ${accessToken}`);
    }
    return NextResponse.rewrite(req.nextUrl, {
      request: {
        headers: newHeaders,
      },
    });
  }

  // Check protected routes
  if (ROUTE_PROTECTED_LIST.some((path) => pathname.startsWith(path))) {
    if (
      accessToken == undefined ||
      accessToken == null ||
      accessToken.length < 1
    ) {
      const loginUrl = new URL("/auth/login", process.env.WEBSITE_URL);
      return NextResponse.redirect(loginUrl);
    }

    // Check permission feature
    const feature = getRoleFeature(jwt);
    const invalidPermissionUrl = new URL(
      ROUTE_INVALID_FEATURE_PERMISSION,
      process.env.WEBSITE_URL
    );
    if (ROUTE_PROTECTED_ADMIN.some((path) => pathname.startsWith(path))) {
      if (feature != FEATURE_ADMIN) {
        return NextResponse.redirect(invalidPermissionUrl);
      }
    } else if (
      ROUTE_PROTECTED_DIRECTOR.some((path) => pathname.startsWith(path))
    ) {
      if (feature != FEATURE_DIRECTOR) {
        return NextResponse.redirect(invalidPermissionUrl);
      }
    } else if (
      ROUTE_PROTECTED_TEACHER.some((path) => pathname.startsWith(path))
    ) {
      if (feature != FEATURE_TEACHER) {
        return NextResponse.redirect(invalidPermissionUrl);
      }
    } else if (
      ROUTE_PROTECTED_STUDENT.some((path) => pathname.startsWith(path))
    ) {
      if (feature != FEATURE_STUDENT) {
        return NextResponse.redirect(invalidPermissionUrl);
      }
    } else if (
      ROUTE_PROTECTED_PARENT.some((path) => pathname.startsWith(path))
    ) {
      if (feature != FEATURE_PARENT) {
        return NextResponse.redirect(invalidPermissionUrl);
      }
    }
  }

  return response;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

const getJwtToken = async (req: NextRequest) => {
  const jwtToken = await getToken({
    secret: `${process.env.NEXT_AUTH_SECRET}`,
    req: req,
  });
  return jwtToken;
};

const getAccessToken = (jwtToken: JWT | null) => {
  const accessToken = jwtToken?.accessToken as string | null | undefined;

  // Check if the toke haven't expired
  // const accessTokenExpires = jwtToken?.accessTokenExpires as string | null | undefined

  return accessToken;
};

const getRoleFeature = (jwtToken: JWT | null) => {
  const feature: string =
    (jwtToken?.feature as string | null | undefined) ?? "";
  return feature;
};
