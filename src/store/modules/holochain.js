import { connect } from '@holochain/hc-web-client';

export default {
    // State (hafıza)
    state: {
        connect: null,
        connection: undefined,
    },
    // State değiştirmeleri için commit işlemleri
    mutations: {
        holochainConnect: (state, payload) => {
            // Bağlantı başarısız ise bitir
            if (!payload.connect) {
                state.connect = false;
                console.log("Holochain connect fail!!");
                return
            }
            // Başarılıysa kayıt et
            state.connection = payload.connection;
            console.log("Holochain connect success!!");
        }
    },
    // Dışa aktarılan değişkenler
    getters: {
        holochainConnection: (state) => state.connection,
        holochainConnected: (state) => state.connect,
    },
    // Aksiyonlar
    actions: {
        holochainConnect: ({ commit, getters }, payload) => {
            console.log({ payload });

            // Holochain bağlantı işlemleri
            (async () => {
                if (getters.holochainConnection) return getters.holochainConnection;

                const { callZome } = await connect({ url: payload.url });

                // İşlemleri sürdürülebilir olması için fonksiyon yarat
                return (instance, zome, fnName) => async params => {
                    console.log(
                        `Calling zome function: ${instance}/${zome}/${fnName} with params`,
                        params
                    );

                    const result = await callZome(instance, zome, fnName)(params);

                    console.log(
                        `Zome function ${instance}/${zome}/${fnName} with params returned`,
                        result
                    );

                    return result;
                };

            })().then((connection) => { // bağlantı başarılı
                commit("holochainConnect", {
                    connect: true,
                    connection,
                });
            }).catch((err) => { // bağlantı başarısız
                console.log({ type: 'holochain', err });
                commit("holochainConnect", {
                    connect: false,
                });
            });
        },
    },
}