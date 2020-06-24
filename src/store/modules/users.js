const INSTANCE_NAME = 'test-instance';
const ZOOM_NAME = 'hello';

export default {
    state: {},
    mutations: {},
    getters: {},
    actions: {
        // Kullanıcı Listesi
        userGetAll: ({ commit, dispatch, getters }) => new Promise((resolve, reject) => {
            // Holo bağlantı kontrolü
            dispatch('holochainCheck').then(() =>
                getters.holochainConnection(
                    INSTANCE_NAME,
                    ZOOM_NAME,
                    'user_get_all'
                )({})
                    .then(data => {
                        const result = JSON.parse(data);
                        // Sonuç başarılı mı?
                        if ('Ok' in result) {
                            resolve(result.Ok);
                        } else {
                            commit('notificationSet', {
                                color: 'error',
                                text: 'Kullanıcı listesi alınamadı.',
                            });
                            reject();
                        }
                    })
                    .catch(() => {
                        commit('notificationSet', {
                            text: 'Sunucuyla bağlantı kurulamadı.'
                        });
                        reject();
                    })
            );
        }),
        // Kullanıcı ekle
        userAdd: ({ commit, dispatch, getters }, payload) => new Promise((resolve, reject) => {
            // Holo bağlantı kontrolü
            dispatch('holochainCheck').then(() =>
                getters.holochainConnection(
                    INSTANCE_NAME,
                    ZOOM_NAME,
                    'user_add'
                )(payload)
                    .then(data => {
                        const result = JSON.parse(data);
                        // Sonuç başarılı mı?
                        if ('Ok' in result) {
                            commit('notificationSet', {
                                color: 'success',
                                text: 'Kullanıcı başarıyla eklendi.',
                            });
                            resolve(result.Ok);
                        } else {
                            commit('notificationSet', {
                                color: 'error',
                                text: 'Kullanıcı eklenirken hata meydana geldi.',
                            });
                            reject();
                        }
                    })
                    .catch(() => {
                        commit('notificationSet', {
                            text: 'Sunucuyla bağlantı kurulamadı.'
                        });
                        reject();
                    })
            );
        }),
        // Kullanıcı Düzenle
        userUpdate: ({ commit, dispatch, getters }, payload) => new Promise((resolve, reject) => {
            // Holo bağlantı kontrolü
            dispatch('holochainCheck').then(() =>
                getters.holochainConnection(
                    INSTANCE_NAME,
                    ZOOM_NAME,
                    'user_update'
                )(payload)
                    .then(data => {
                        const result = JSON.parse(data);
                        if ('Ok' in result) {
                            commit('notificationSet', {
                                color: 'success',
                                text: 'Kullanıcı başarıyla güncellendi.',
                            });
                            resolve(result.Ok);
                        } else {
                            commit('notificationSet', {
                                color: 'error',
                                text: 'Kullanıcı güncellenirken hata meydana geldi.',
                            });
                            reject();
                        }
                    })
                    .catch(() => {
                        commit('notificationSet', {
                            text: 'Sunucuyla bağlantı kurulamadı.'
                        });
                        reject();
                    })
            )
        }),

    },
}