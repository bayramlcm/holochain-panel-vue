import { connect } from '@holochain/hc-web-client';
import { holochain as holochainConfig } from '../../bin/config';

let connection = undefined;

export default async function getConnection() {
    // return connection if already established
    if (connection) return connection;
  
    // establish a new websocket connection and expose callZome
    const { callZome } = await connect({ url: holochainConfig.url });
  
    // define connection and execute callZome function
    connection = (instance, zome, fnName) => async params => {
      console.log(
        `Calling zome function: ${instance}/${zome}/${fnName} with params`,
        params
      );
  
      // https://developer.holochain.org/docs/guide/conductor_json_rpc_api/
      const result = await callZome(instance, zome, fnName)(params);
  
      console.log(
        `Zome function ${instance}/${zome}/${fnName} with params returned`,
        result
      );
  
      return result;
    };
  
    return connection;
  }
  