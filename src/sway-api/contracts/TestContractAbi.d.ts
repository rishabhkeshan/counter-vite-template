/* Autogenerated file. Do not edit manually. */

/* tslint:disable */
/* eslint-disable */

/*
  Fuels version: 0.92.1
  Forc version: 0.61.2
  Fuel-Core version: 0.31.0
*/

import type {
  BigNumberish,
  BN,
  BytesLike,
  Contract,
  DecodedValue,
  FunctionFragment,
  Interface,
  InvokeFunction,
} from 'fuels';

interface TestContractAbiInterface extends Interface {
  functions: {
    get_count: FunctionFragment;
    increment_counter: FunctionFragment;
  };
}

export class TestContractAbi extends Contract {
  interface: TestContractAbiInterface;
  functions: {
    get_count: InvokeFunction<[], BN>;
    increment_counter: InvokeFunction<[amount: BigNumberish], BN>;
  };
}
