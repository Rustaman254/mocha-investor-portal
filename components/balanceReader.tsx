import { getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { useReadContract, useActiveAccount } from "thirdweb/react";
import { createThirdwebClient } from "thirdweb";

// Create client
const THIRDWEB_CLIENT = createThirdwebClient({
  clientId: "e3f84c8714d65ddfb2c6b154bd40f4c3",
});

// Define Scroll Sepolia chain
const scrollSepolia = defineChain({
  id: 534351,
  name: "Scroll Sepolia",
  rpc: "https://sepolia-rpc.scroll.io/",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  blockExplorers: [
    {
      name: "Scroll Sepolia Explorer",
      url: "https://sepolia.scrollscan.dev/",
      apiUrl: "https://api-sepolia.scrollscan.dev/api"
    },
  ],
  testnet: true,
});

// Get the contract instance
const mochaTreeRightsToken = getContract({
  address: "0x16F5A35647D6F03D5D3da7b35409D65ba03aF3B2", // Replace with your actual contract address
  chain: scrollSepolia,
  client: THIRDWEB_CLIENT,
});

function BalanceReader() {
  // Get the currently connected account
  const account = useActiveAccount();
  
  // Read the balanceOf for the connected account
  const { data: balance, isLoading, error } = useReadContract({
    contract: mochaTreeRightsToken,
    method: "function balanceOf(address owner) view returns (uint256)",
    params: [account?.address || "0x0000000000000000000000000000000000000000"], // Use connected address or zero address as fallback
  });

  // Read total supply for additional info
  const { data: totalSupply } = useReadContract({
    contract: mochaTreeRightsToken,
    method: "function totalSupply() view returns (uint256)",
    params: [],
  });

  // Read decimals to format the balance correctly
  const { data: decimals } = useReadContract({
    contract: mochaTreeRightsToken,
    method: "function decimals() view returns (uint8)",
    params: [],
  });

  // Format balance for display
  const formatBalance = (balance: bigint | undefined, decimals: number = 18) => {
    if (!balance) return "0";
    return (Number(balance) / Math.pow(10, decimals)).toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 4,
    });
  };

  if (!account) {
    return (
      <div className="p-4 border rounded-lg">
        <h3 className="text-lg font-semibold mb-2">MTTR Balance</h3>
        <p className="text-gray-500">Please connect your wallet to view balance</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-4 border rounded-lg">
        <h3 className="text-lg font-semibold mb-2">MTTR Balance</h3>
        <p className="text-gray-500">Loading balance...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 border rounded-lg">
        <h3 className="text-lg font-semibold mb-2">MTTR Balance</h3>
        <p className="text-red-500">Error loading balance: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Mocha Tree Rights Token Balance</h3>
      <div className="space-y-2">
        <div>
          <span className="text-gray-600">Address: </span>
          <span className="font-mono text-sm">{account.address}</span>
        </div>
        <div>
          <span className="text-gray-600">Balance: </span>
          <span className="font-semibold text-lg">
            {formatBalance(balance, decimals || 18)} MTTR
          </span>
        </div>
        <div>
          <span className="text-gray-600">Raw Balance: </span>
          <span className="font-mono text-sm">{balance?.toString() || "0"}</span>
        </div>
        {totalSupply && (
          <div>
            <span className="text-gray-600">Total Supply: </span>
            <span className="font-semibold">
              {formatBalance(totalSupply, decimals || 18)} MTTR
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default BalanceReader;