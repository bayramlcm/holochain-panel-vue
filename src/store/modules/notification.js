export default {
    state: {
        display: false,
        timeout: 2000,
        color: 'success',
        text: 'Bildirim',
    },
    mutations: {
        notificationSet: (state, { display = true, text = '', color = '', timeout = 2000 }) => {
            state.display = display
            state.text = text
            state.color = color
            state.timeout = timeout
        },
    },
    getters: {
        notificationGet: state => state,
    },
    actions: {
    }
}