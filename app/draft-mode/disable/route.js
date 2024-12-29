import { draftMode } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request) {
  await (await draftMode()).disable()
  return NextResponse.redirect(new URL("/", request.url))
}