import React, { useState, useContext, useEffect } from 'react';
import { AuctionContract, FactoryContract } from '../utils/contracts';
import { MetaMaskContext } from '../contexts/meta-mask';

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
    <div className="flex items-center py-16">
      <div className="w-3/5">
        <img
          src={selectedTeam.image}
          alt=""
        />
      </div>
      
      <div className="w-2/5 ml-16 p-6 shadow rounded">
        <dl className="mb-4">
          {
            teamInfo.map(({term, definition}, index) => (
              <div
                key={index}
                className="flex items-center justify-between mb-2 last:mb-0"
              >
                <dt className="text-sm font-bold">
                  {term}
                </dt>
                <dd className="text-xs">
                  {definition}
                </dd>
              </div>    
            ))
          }
        </dl>

        <p className="py-6 text-center text-3xl font-bold border-t-2 border-b-2 mb-5">
          {(totalMinted + 1) * 0.1} E
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
