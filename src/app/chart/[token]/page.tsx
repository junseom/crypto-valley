import React from "react";

async function getTokenData(token: string) {
  const res = await fetch(`http://localhost:3000/api/coin-data?token=${token}`, {
    next: { revalidate: 10 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch token data");
  }

  return res.json();
}

const TokenChartPage = async ({ params }: { params: { token: string } }) => {
  try {
    const token = params.token;
    const data = await getTokenData(token);

    return (
      <div className="p-8">
        <h1 className="text-2xl font-semibold">{token.toUpperCase()} Price</h1>
        <div className="mt-4 text-xl">
          {data[token]?.usd ? (
            <p>Current Price: ${data[token].usd}</p>
          ) : (
            <p>Data not available</p>
          )}
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-semibold">Error</h1>
        <p>Failed to fetch token data. Please try again later.</p>
      </div>
    );
  }
};

export default TokenChartPage;
