import { NextResponse } from "next/server";

const COUNTRY_HEADERS = [
  "x-vercel-ip-country",
  "cf-ipcountry",
  "cloudfront-viewer-country",
  "x-country-code",
  "x-appengine-country",
];

function getCountryCode(request) {
  for (const header of COUNTRY_HEADERS) {
    const value = request.headers.get(header);

    if (value && value !== "XX") {
      return value.trim().toUpperCase();
    }
  }

  return "";
}

export function proxy(request) {
  const { pathname } = request.nextUrl;

  if (pathname === "/en" || pathname.startsWith("/en/") || pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  const countryCode = getCountryCode(request);

  if (countryCode && countryCode !== "BR") {
    const url = request.nextUrl.clone();
    url.pathname = "/en";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
