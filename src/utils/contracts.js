import Web3 from 'web3';
import CONTRACTS from '../contracts';

export class Contract {
  constructor() {
    if (window.ethereum) {
      this.provider = new Web3(window.ethereum);
    }
  }

  call({ method = 'call', func, options, args }) {
    if (!this.provider) {
      return;
    }

    return new Promise((resolve, reject) => {
      this.contract.methods[func](...args ?? [])[method](options)
        .then(result => resolve(result))
        .catch(err => reject(err));
    });
  }
}

export class AuctionContract extends Contract {
  constructor() {
    super(...arguments);

    if (this.provider) {
      this.contract = new this.provider.eth.Contract(
        CONTRACTS.auction.abi,
        CONTRACTS.auction.address,
      );
    }
  }
}

export class FactoryContract extends Contract {
  constructor() {
    super(...arguments);

    if (this.provider) {
      this.contract = new this.provider.eth.Contract(
        CONTRACTS.factory.abi,
        CONTRACTS.factory.address,
      );
    }
  }
}
