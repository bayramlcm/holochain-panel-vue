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
                state.connect = payload.connect;
                state.connection = undefined;
                console.log("Holochain connect fail!!");
                return
            }
            // Başarılıysa kayıt et
            state.connect = true;
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
        // Holochain bağlantı
        holochainConnect: ({ commit, dispatch }, payload) => {
            // Holochain bağlantı işlemleri
            new Promise((resolve, reject) => {
                connect({
                    url: payload.HOST_URL
                })
                    .then(({ callZome, ws }) => { // arguments: close, onSignal
                        // Eğer bağlantı koparsa
                        ws.once('close', (close) => dispatch('holochainReConnect', payload));
                        // Başarılı!
                        resolve((instance, zome, fnName) => params => new Promise((resolve, reject) => {
                            console.log(
                                `Holochain (giden) fonksiyon: ${instance}/${zome}/${fnName}, parametreler: `,
                                params
                            );

                            callZome(instance, zome, fnName)(params)
                                .then(result => {
                                    console.log(
                                        `Holochain (gelen) fonksiyon: ${instance}/${zome}/${fnName}, yanıt: `,
                                        result
                                    );
                                    resolve(result)
                                })
                                .catch(err => {
                                    console.log(`Holochain (error) fonksiyon: ${instance}/${zome}/${fnName}, yanıt: `, err,);
                                    reject(err)
                                });
                        }));
                    })
                    .catch((err) => reject(err))
            }).then((connection) => commit("holochainConnect", {
                connect: true,
                connection,
            })).catch(() => dispatch('holochainReConnect', payload));
        },
        // Holochain otomatik bağlantı
        holochainReConnect: ({ commit, dispatch }, payload) => {
            commit("holochainConnect", { connect: false });
            // Yeni bağlantı hazırlığı (1 saniye)
            setTimeout(() => {
                console.log("Holochain bağlantı kurulmaya çalışıyor");
                commit("holochainConnect", { connect: null });
                // Yeni bağlantı oluştur (0.5 saniye)
                setTimeout(() => {
                    // Bağlantıyı sağla
                    dispatch('holochainConnect', payload);
                }, 500);
            }, 1000)
        }
    },
}