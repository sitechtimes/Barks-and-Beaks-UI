import {ref, computed} from 'vue'
import {defineStore} from 'pinia'

export const useLoginInfo = defineStore('loginInfo', () => {
    const loggedIn = ref(false)
    const currentClub = ref(null)

    return { loggedIn, currentClub }
})

