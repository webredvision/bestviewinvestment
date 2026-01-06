import { getSiteData } from "@/lib/functions";
import { NextResponse } from "next/server";
 
export async function GET(req) {
    const siteData = await getSiteData();
    const userAgent = (req.headers.get("user-agent") || "").toLowerCase();
    
    // Fallback URL if siteData is missing or URLs are missing
    const fallbackUrl = new URL("/", req.url).toString();

    if (!siteData || Object.keys(siteData).length === 0) {
        return NextResponse.redirect(fallbackUrl);
    }

    if (userAgent.includes("iphone") || userAgent.includes("ipad") || userAgent.includes("ipod")) {
        return NextResponse.redirect(siteData?.appsappleurl || fallbackUrl);
    } else if (userAgent.includes("android")) {
        return NextResponse.redirect(siteData?.appsplaystoreurl || fallbackUrl);
    } else {
        return NextResponse.redirect(fallbackUrl);
    }
}