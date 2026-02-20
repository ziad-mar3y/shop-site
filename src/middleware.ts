import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Cart auth is handled in the cart page (getServerSession) - Edge middleware
// has cookie issues on Vercel production. Keep middleware empty or for other routes.
export function middleware(_request: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: [],
};
