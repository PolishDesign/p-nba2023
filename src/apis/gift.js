import api from '../configs/api'

export const getGifts = ({count = 30, page = 1}) => {
  return api({
    method: 'get',
    url: `/gifts?count=${count}&page=${page}`
  })
}

export const getGiftByCode = (giftCode = '') => {
  return api({
    method: 'get',
    url: `/gift/${giftCode}`
  })
}

export const getGiftByNumber = (giftNumber = '') => {
  return api({
    method: 'get',
    url: `/gift/number/${giftNumber}`
  })
}

export const unlockGift = (giftCode = '') => {
  return api({
    method: 'post',
    url: `/unlock`,
    data: {
      unlock_code: giftCode
    }
  })
}

export default {
  getGifts,
  getGiftByCode,
  getGiftByNumber,
  unlockGift
}
