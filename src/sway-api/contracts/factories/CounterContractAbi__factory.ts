/* Autogenerated file. Do not edit manually. */

/* tslint:disable */
/* eslint-disable */

/*
  Fuels version: 0.92.1
  Forc version: 0.61.2
  Fuel-Core version: 0.31.0
*/

import { Interface, Contract, ContractFactory } from "fuels";
import type { Provider, Account, AbstractAddress, BytesLike, DeployContractOptions, StorageSlot, DeployContractResult } from "fuels";
import type { CounterContractAbi, CounterContractAbiInterface } from "../CounterContractAbi";

const _abi = {
  "encoding": "1",
  "types": [
    {
      "typeId": 0,
      "type": "u64",
      "components": null,
      "typeParameters": null
    }
  ],
  "functions": [
    {
      "inputs": [],
      "name": "get_count",
      "output": {
        "name": "",
        "type": 0,
        "typeArguments": null
      },
      "attributes": [
        {
          "name": "storage",
          "arguments": [
            "read"
          ]
        }
      ]
    },
    {
      "inputs": [
        {
          "name": "amount",
          "type": 0,
          "typeArguments": null
        }
      ],
      "name": "increment_counter",
      "output": {
        "name": "",
        "type": 0,
        "typeArguments": null
      },
      "attributes": [
        {
          "name": "storage",
          "arguments": [
            "write",
            "read"
          ]
        }
      ]
    }
  ],
  "loggedTypes": [],
  "messagesTypes": [],
  "configurables": []
};

const _storageSlots: StorageSlot[] = [
  {
    "key": "6e3c7b4f69bbff7132c3c3a62883a6868f47b0bc2a7f21605f29038cd9a5e05f",
    "value": "0000000000000000000000000000000000000000000000000000000000000000"
  }
];

export const CounterContractAbi__factory = {
  abi: _abi,

  storageSlots: _storageSlots,

  createInterface(): CounterContractAbiInterface {
    return new Interface(_abi) as unknown as CounterContractAbiInterface
  },

  connect(
    id: string | AbstractAddress,
    accountOrProvider: Account | Provider
  ): CounterContractAbi {
    return new Contract(id, _abi, accountOrProvider) as unknown as CounterContractAbi
  },

  async deployContract(
    bytecode: BytesLike,
    wallet: Account,
    options: DeployContractOptions = {}
  ): Promise<DeployContractResult<CounterContractAbi>> {
    const factory = new ContractFactory(bytecode, _abi, wallet);

    return factory.deployContract<CounterContractAbi>({
      storageSlots: _storageSlots,
      ...options,
    });
  },
}
