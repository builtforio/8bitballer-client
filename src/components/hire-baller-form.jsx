import React, { useState, useContext, useEffect } from 'react';
import { MetaMaskContext } from '../contexts/meta-mask';
import Icon from './icon';
import { AuctionContract, FactoryContract } from '../utils/contracts';

const BASE_COST = 100000000000000000;

const auctionContract = new AuctionContract();
const factoryContract = new FactoryContract();

const HireBallerForm = ({ selectedTeam }) => {
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
      definition: totalMinted,
    }
  ];

  useEffect(() => {
    async function callContract() {
      try {
        let response = await factoryContract.call({
          func: 'getBallersInCirculation',
          args: [selectedTeam.id],
        });
        setTotalMinted(parseInt(response));
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    }
    
    setIsLoading(true);
    
    if (currentAccount) {
      callContract(currentAccount);
    }
  }, [currentAccount, selectedTeam]);

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

        <p className="py-6 text-center text-3xl font-bold border-t-2 border-b-2 mb-5">
          {((totalMinted + 1) * 0.1).toPrecision(1)} E
        </p>

        <button
          type="button"
          className="w-full text-center cursor-pointer hover:bg-gray-100 rounded text-lg font-bold p-1"
          disabled={isLoading}
          onClick={async () => {
            try {
              await auctionContract.call({
                method: 'send',
                func: 'buyBaller',
                args: [currentAccount, selectedTeam.id],
                options: {
                  from: currentAccount,
                  value: BASE_COST * (totalMinted + 1),
                },
              });
            } catch(e) {
              console.log(e);
            }
          }}
        >
          Buy This Baller
        </button>
      </div>
    </div>
  );
};

export default HireBallerForm;
