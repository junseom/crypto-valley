import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token"); // URL의 "token" 파라미터 가져오기

  try {
    // CoinGecko API 호출
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${token}&vs_currencies=usd`
    );

    return NextResponse.json(response.data); // 성공적으로 데이터 반환
  } catch (error) {
    console.error("Error fetching data from CoinGecko:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch data from CoinGecko" },
      { status: 500 }
    );
  }
}
