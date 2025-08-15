import { useEffect, useState } from "react";
import { createThirdwebClient, getContract, readContract } from "thirdweb";
import { sepolia } from "thirdweb/chains"; // or your chain
import contractABI from "./abi.json"; // Your contract ABI
import { useReadContract } from "thirdweb/react";

const CONTRACT_ADDRESS = "0xYourContractAddress";
const CLIENT_ID = "your_client_id"; // from thirdweb dashboard

export function useFarms() {
  const [farms, setFarms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFarms() {
      setLoading(true);
      const client = createThirdwebClient({ clientId: CLIENT_ID });
      const contract = getContract({
        client,
        address: CONTRACT_ADDRESS,
        chain: sepolia, // or your chain
        abi: contractABI,
      });

      // 1. Get all active farm IDs
      const farmIds = useReadContract({
        contract,
        method: "function getActiveFarmIds() view returns (uint256[])",
        params: [],
      });

      // 2. Fetch config for each farm
      const farmConfigs = await Promise.all(
        farmIds.map((id) =>
          useReadContract({
            contract,
            method:
              "function getFarmConfig(uint256) view returns (tuple(string name,address farmOwner,uint256 treeCount,uint256 targetAPY,uint256 maturityPeriod,uint256 bondValue,uint256 collateralRatio,uint256 minInvestment,uint256 maxInvestment,address shareTokenAddress,bool active,uint256 createdTimestamp,uint256 maturityTimestamp))",
            params: [id],
          }),
        ),
      );
      setFarms(farmConfigs);
      setLoading(false);
    }
    fetchFarms();
  }, []);

  return { farms, loading };
}
