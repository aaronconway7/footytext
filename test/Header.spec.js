import { mount } from '@vue/test-utils'
import Header from '@/components/Header.vue'
import dayjs from 'dayjs'

describe(`Header`, () => {
    let wrapper
    beforeEach(() => {
        wrapper = mount(Header, {
            mocks: {
                $route: { params: { season: 1996 } },
                $dayjs: dayjs,
                $store: { state: { dailyRequestsRemaining: 7 } },
            },
        })
    })

    it(`renders`, () => {
        expect(wrapper.exists()).toBe(true)
    })

    it(`title is FOOTYTEXT`, () => {
        expect(wrapper.find(`h1`).text()).toBe(`FOOTYTEXT`)
    })

    it(`shows current date in correct format`, () => {
        const dateFormat = `ddd DD MMM YYYY`
        expect(wrapper.find(`.date`).text()).toBe(dayjs().format(dateFormat))
    })

    it(`shows current date in correct format`, () => {
        const timeFormat = `HH:mm/ss`
        expect(wrapper.find(`.time`).text()).toBe(dayjs().format(timeFormat))
    })

    it(`shows daily requests remaining correctly`, () => {
        expect(wrapper.find(`.daily-requests-remaining`).text()).toBe(
            `CEEFAX 7`
        )
    })

    it(`shows correct page number`, () => {
        expect(wrapper.find(`.page`).text()).toBe(`P1996`)
    })
})
