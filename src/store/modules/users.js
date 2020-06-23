const INSTANCE_NAME = 'test-instance';
const ZOOM_NAME = 'hello';

export default {
    state: {},
    mutations: {},
    getters: {},
    actions: {
        // Kullanıcı ekle
        userAdd: ({ commit, getters }, payload) => new Promise((resolve, reject) => {
            // Holo bağlantı kontrolü
            if (!getters.holochainConnection)
                return commit("notificationSet", {
                    color: "error",
                    text: "Holo sunucusuyla bağlantı kurulamıyor"
                });

            getters.holochainConnection(
                INSTANCE_NAME,
                ZOOM_NAME,
                "create_person"
            )({ person: payload })
                .then(data => {
                    const result = JSON.parse(data);
                    commit('notificationSet', {
                        color: 'success',
                        text: 'Kullanıcı başarıyla eklendi.',
                    });
                    resolve(result.Ok);
                })
                .catch(() => {
                    commit('notificationSet', {
                        text: 'Sunucuyla bağlantı kurulamadı.'
                    });
                    reject();
                })
        }),
    },
}