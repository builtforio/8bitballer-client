import React, { useState, useContext, useEffect } from 'react';
import { useToasts } from 'react-toast-notifications';
import { MetaMaskContext } from '../contexts/meta-mask';
import Icon from './icon';
import { AuctionContract, FactoryContract } from '../utils/contracts';
import pinataSDK from "@pinata/sdk";

const TRX_ERROR_CODE_MAP = {
  4001: 'You canceled the transaction.',
};

const BASE_COST = 100000000000000000;

const auctionContract = new AuctionContract();
const factoryContract = new FactoryContract();

async function getBallersInCirculation(teamId) {
  let response = await factoryContract.call({
    func: 'getBallersInCirculation',
    args: [teamId],
  });

  return parseInt(response);
}

const HireBallerForm = ({
  selectedTeam,
  hasActiveTrx,
  onSetHasActiveTrx,
}) => {
  let { addToast } = useToasts();
  let [isLoading, setIsLoading] = useState(true);
  let [totalMinted, setTotalMinted] = useState(0);
  let { accounts } = useContext(MetaMaskContext);
  let [currentAccount] = accounts;

  let teamInfo = [
    {
      
      term: 'Baller Team:',
      definition: selectedTeam.city,
    },
    {
      isLoading,
      term: 'Ballers Created:',
      definition: totalMinted + " / 100",
    }
  ];

  useEffect(() => {
    async function callContract() {
      if (!currentAccount || hasActiveTrx) {
        return;
      }
      
      setIsLoading(true);

      try {
        setTotalMinted(await getBallersInCirculation(selectedTeam.id));
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    }
    
    callContract(currentAccount);
  }, [currentAccount, selectedTeam, hasActiveTrx]);

  return (
    <div className="sm:flex items-center py-10 sm:py-16">
      <div className="sm:w-7/12">
        <img
          src={selectedTeam.image}
          alt=""
        />
      </div>
      
      <div className="sm:w-5/12 sm:ml-8 mt-8 sm:mt-0 p-6 shadow rounded">
        <dl className="mb-4">
          {
            teamInfo.map((info, index) => (
              <div
                key={index}
                className="flex items-center justify-between mb-2 last:mb-0"
              >
                <dt className="text-sm font-bold">
                  {info.term}
                </dt>
                <dd className="text-xs">
                  {
                    info.isLoading
                      ? (
                          <Icon
                            iconKey="basketball"
                            className="h-3 w-3 animate-spin"
                          />
                        )
                      : info.definition
                  }
                </dd>
              </div>    
            ))
          }
        </dl>

        <p className="flex items-center justify-center py-6 text-3xl font-bold border-t-2 border-b-2 mb-5">
          {
            isLoading
              ? (
                  <Icon
                    iconKey="basketball"
                    className="h-8 w-8 animate-spin"
                  />
                )
              : (<span>{((totalMinted + 1) * 0.1).toPrecision(1)}</span>)
          }
          <span className="ml-2">ETH</span>
        </p>

        <button
          type="button"
          className="w-full text-center cursor-pointer hover:bg-gray-100 rounded font-bold px-1 py-2"
          disabled={isLoading || hasActiveTrx}
          onClick={async () => {
            const metadata = {
                name: 'Metadata',
                keyvalues: {
                    ballerTeam: {
                        value: selectedTeam.city,
                        op: 'eq'
                    },
                    ballerNumber: {
                        value: (totalMinted + 1),
                        op: 'eq'
                    }
                }
            }

            onSetHasActiveTrx(true);
            try {
              const pinata = new pinataSDK('d70a58fdb43b12a53f81', '3e653776599cd63698f26e10efcb8689db5df16d69faf5f3860632a82e506742');
              const pin = await pinata.pinList({
                  status: "pinned",
                  metadata
              });
              const ipfsHash = pin.rows[0].ipfs_pin_hash;
              let result = await auctionContract.call({
                method: 'send',
                func: 'buyBaller',
                args: [currentAccount, selectedTeam.id, ipfsHash],
                options: {
                  from: currentAccount,
                  value: BASE_COST * (totalMinted + 1),
                },
              });
              
              addToast(
                (
                  <p>
                    <span className="block mb-1">
                      <strong>Nice!</strong> You just bought a Baller.
                    </span>
                    
                    <a
                      href={`https://rinkeby.etherscan.io/tx/${result.transactionHash}`}
                      className="underline text-sm"
                      target="_blank"
                      rel="noreferrer"
                    >
                      View on Etherscan 
                    </a>
                  </p>
                ),
                { appearance: 'success'},
              );
            } catch(e) {
              console.error(e);
              addToast(
                (
                  <p>
                    <span className="block mb-1">
                      <strong>Bummer!</strong> {TRX_ERROR_CODE_MAP[e.code] ?? 'Something went wrong.'}
                    </span>
                  </p>
                ),
                { appearance: 'error'},
              );
            } finally {
              onSetHasActiveTrx(false);
            }
          }}
        >
          {hasActiveTrx
            ? (
                <div className="flex items-center justify-center">
                  <Icon
                    iconKey="basketball"
                    className="h-6 w-6 mr-3 animate-spin"
                  /> 
                  <span>Requesting Baller…</span>
                </div>
              ) 
            : "Buy This Baller"
          }
        </button>
      </div>
    </div>
  );
};

export default HireBallerForm;
